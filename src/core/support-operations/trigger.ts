import { utils, BigNumber, providers, BigNumberish } from 'ethers';

import { Erc20 } from './erc20-token';

import { PriceFeedABI, simpleTriggerFactoryABI } from '@/config/abi';
import { TRIGGER_FACTORY_ADDRESS } from '@/config/contracts';
import { tokens } from '@/config/tokens';
import { PreOpStruct } from '@/types/custom';
import { getTokenByTokenSymbol } from '@/utils/get-token-by-symbol';
import { toAtomic } from '@/utils/units';

export namespace Trigger {
  export interface CreateTriggerPreOpParams {
    amount: string;
    takeProfit: string;
    stopLoss: string;
    tokenSymbol: string;
  }

  export interface getTriggerAddressParams {
    params: readonly [
      readonly [readonly [`0x${string}` | undefined, string, string, number]],
      string,
      string,
      string,
      `0x${string}` | undefined,
      12
    ];
  }

  export interface getPriceParams {
    priceFeedAddress: string;
  }
}

const LINK_TOKEN_ADDRESS = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
const BASE_STABLECOIN_TOKEN = tokens.find(token => token.symbol === 'USDC')!;
const SALT = 12;
const LINK_PRICE = 3;

const calculatedPoint = (amount: string, tokenPrice: BigNumberish, param: string) => {
  const atomicAmount = toAtomic(amount, 18);

  const sum = atomicAmount.mul(tokenPrice);

  const percent = BigNumber.from(100).add(param);

  const percentResult = sum.mul(percent);

  const result = percentResult.div(100);

  const realResult = result.div(BigNumber.from(10).pow(18));

  return realResult.toString();
};

export class Trigger {
  static Interface = new utils.Interface(simpleTriggerFactoryABI.abi);
  static PriceFeedInterface = new utils.Interface(PriceFeedABI);
  static CONTRACT_ADDRESS = TRIGGER_FACTORY_ADDRESS;
  static provider: providers.Provider | null = null;
  static walletAddress: string | null = null;

  static setProvider(provider: providers.Provider) {
    Trigger.provider = provider;
  }

  static setWalletAddress(walletAddress: string) {
    Trigger.walletAddress = walletAddress;
  }

  static async createTriggerPreOp({
    amount,
    stopLoss,
    takeProfit,
    tokenSymbol
  }: Trigger.CreateTriggerPreOpParams): Promise<Array<PreOpStruct>> {
    const token = getTokenByTokenSymbol(tokenSymbol);

    if (!token.triggerInfo) {
      throw new Error('Token does not have trigger info');
    }
    if (!Trigger.walletAddress) {
      throw new Error('Trigger wallet address not set');
    }

    const linkApprovePreOp = Erc20.createApprovePreOp({
      atomicAmount: toAtomic(LINK_PRICE, 18).toString(),
      confidant: Trigger.CONTRACT_ADDRESS,
      tokenAddress: LINK_TOKEN_ADDRESS
    });

    const tokenPrice = await Trigger.getPrice({ priceFeedAddress: token.triggerInfo.priceFeed });

    console.log({ tokenPrice: tokenPrice.toString() });

    const calculatedStopLoss = calculatedPoint(amount, tokenPrice, stopLoss);

    const calculatedTakeProfit = calculatedPoint(amount, tokenPrice, takeProfit);

    console.log({ calculatedStopLoss, calculatedTakeProfit });

    const params = [
      [[token.address, token.triggerInfo.priceFeed, toAtomic(1, 18).toString(), token.triggerInfo.poolFee]],
      calculatedStopLoss,
      calculatedTakeProfit,
      Trigger.walletAddress,
      BASE_STABLECOIN_TOKEN.address,
      SALT
    ] as const;

    console.log({ params });

    const createTriggerData = Trigger.Interface.encodeFunctionData('createAccount', params);

    const createTriggerPreOp = {
      target: Trigger.CONTRACT_ADDRESS,
      value: 0,
      data: createTriggerData
    };

    const triggerAddress = await Trigger.getTriggerAddress({ params });

    console.log({ triggerAddress });

    const transferPreOp = Erc20.createTransferPreOp({
      amount,
      receiver: triggerAddress,
      tokenSymbol
    });

    return linkApprovePreOp.concat(createTriggerPreOp, transferPreOp);
  }

  static async getPrice({ priceFeedAddress }: Trigger.getPriceParams) {
    if (!Trigger.provider) {
      throw new Error('Trigger provider not set');
    }

    const calldata = Trigger.PriceFeedInterface.encodeFunctionData('latestRoundData');

    const result = await Trigger.provider.call({
      to: priceFeedAddress,
      data: calldata
    });
    const types = ['uint80', 'int256', 'uint256', 'uint256', 'uint80'];

    const [, price] = utils.defaultAbiCoder.decode(types, result);

    return BigNumber.from(price);
  }

  static async getTriggerAddress({ params }: Trigger.getTriggerAddressParams): Promise<string> {
    if (!Trigger.provider) {
      throw new Error('Trigger provider not set');
    }

    let calldata;
    try {
      calldata = Trigger.Interface.encodeFunctionData('getAddress', params);
    } catch (e) {
      console.log(e);
    }
    if (!calldata) {
      throw new Error('calldata is undefined');
    }

    const result = await Trigger.provider.call({
      to: Trigger.CONTRACT_ADDRESS,
      data: calldata
    });

    const [triggerAddress] = utils.defaultAbiCoder.decode(['address'], result) as [string];

    return triggerAddress;
  }
}

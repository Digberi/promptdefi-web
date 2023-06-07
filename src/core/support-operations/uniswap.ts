import { WETH } from '@uniswap/sdk';
import { Currency, CurrencyAmount, Percent, TradeType, Token } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import {
  FeeAmount,
  Pool,
  Route,
  SwapOptions,
  SwapQuoter,
  SwapRouter,
  Trade,
  computePoolAddress
} from '@uniswap/v3-sdk';
import { BigNumber, Contract, providers, utils } from 'ethers';
import JSBI from 'jsbi';
import { goerli } from 'wagmi';

import { Erc20 } from './erc20-token';
import { WrapEth } from './wrap-eth';

import { MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS } from '@/config/constants';
import { POOL_FACTORY_CONTRACT_ADDRESS, QUOTER_CONTRACT_ADDRESS, SWAP_ROUTER_ADDRESS } from '@/config/contracts';
import { Token as IToken, tokens } from '@/config/tokens';
import { PreOpStruct } from '@/types/custom';
import { fromReadableAmount, toAtomic } from '@/utils/units';

//#region Types
type TokenTrade = Trade<Token, Token, TradeType>;

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: BigNumber;
  liquidity: BigNumber;
  tick: number;
}

interface getPoolInfoOptions {
  tokenIn: Token;
  tokenOut: Token;
  poolFee?: FeeAmount;
}

interface getOutputQuoteOptions {
  route: Route<Currency, Currency>;
  amountIn: string;
  tokenIn: Token;
}

interface createTradeOptions {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
  poolFee?: FeeAmount;
}

interface executeTradeOptions {
  trade: TokenTrade;
  tokenIn: Token;
  amountIn: string;
}

interface swapOptions {
  tokenIn?: IToken;
  tokenOut?: IToken;
  amountIn: string;
}
//#endregion Types

export namespace Uniswap {
  export interface CreateSwapPreOpParams {
    tokenSymbolIn?: string;
    tokenSymbolOut?: string;
    atomicAmount: string;
  }
}

const createToken = (token?: IToken) => {
  if (token && token.symbol !== 'ETH') {
    return new Token(goerli.id, token.address, token.decimals, token.symbol, token.name);
  } else {
    const weth = WETH[goerli.id];

    return new Token(goerli.id, weth.address, weth.decimals, weth.symbol, weth.name);
  }
};

const prePareTokenPair = ({ tokenA, tokenB }: { tokenA?: IToken; tokenB?: IToken }) => {
  if (!tokenA && !tokenB) {
    throw new Error('No token pair provided');
  }

  const tokenIn = createToken(tokenA);
  const tokenOut = createToken(tokenB);

  const needWeth = !tokenA;

  return { tokenIn, tokenOut, needWeth };
};

export class Uniswap {
  private static instance: Uniswap | null = null;

  static create(provider: providers.Provider, walletAddress: string) {
    Uniswap.instance = new Uniswap(provider, walletAddress);
  }

  static async createSwapPreOp({ tokenSymbolIn, tokenSymbolOut, atomicAmount }: Uniswap.CreateSwapPreOpParams) {
    if (!Uniswap.instance) {
      throw new Error('Uniswap instance not initialized');
    }

    const tokenIn = tokens.find(token => token.symbol === tokenSymbolIn)!;
    const tokenOut = tokens.find(token => token.symbol === tokenSymbolOut)!;

    const amountIn = fromReadableAmount(Number(atomicAmount), tokenIn.decimals).toString();

    return await Uniswap.instance.createSwapPreOp({
      tokenIn,
      tokenOut,
      amountIn
    });
  }

  constructor(private readonly provider: providers.Provider, private readonly walletAddress: string) {}

  async createSwapPreOp({ tokenIn: tokenA, tokenOut: tokenB, amountIn }: swapOptions) {
    const { tokenIn, tokenOut, needWeth } = prePareTokenPair({ tokenA, tokenB });
    const operations: Array<PreOpStruct> = [];

    if (needWeth) {
      const wrapEthPreOp = WrapEth.createDepositPreOp({
        atomicAmount: toAtomic(amountIn, tokenIn.decimals).toString()
      });

      operations.push(...wrapEthPreOp);
    }

    const trade = await this.createTrade({
      tokenIn,
      tokenOut,
      amountIn
    });

    const tradePreOp = this.createTradePreOp({
      trade,
      tokenIn,
      amountIn
    });

    console.log(tradePreOp);

    return operations.concat(tradePreOp);
  }

  private createTradePreOp({ trade, tokenIn, amountIn }: executeTradeOptions): Array<PreOpStruct> {
    const atomicAmountIn = toAtomic(amountIn, tokenIn.decimals)?.toString();

    const approvePreOp = Erc20.createApprovePreOp({
      confidant: SWAP_ROUTER_ADDRESS,
      tokenAddress: tokenIn.address,
      atomicAmount: atomicAmountIn
    });

    const options: SwapOptions = {
      slippageTolerance: new Percent(500, 10000), // 50 bips, or 0.50%
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
      recipient: this.walletAddress
    };

    const { calldata, value } = SwapRouter.swapCallParameters([trade], options);

    const swapPreOp = {
      target: SWAP_ROUTER_ADDRESS,
      value,
      data: calldata,
      maxFeePerGas: MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS
    };

    return approvePreOp.concat(swapPreOp);
  }

  private async createTrade({
    tokenIn,
    tokenOut,
    amountIn,
    poolFee = FeeAmount.MEDIUM
  }: createTradeOptions): Promise<TokenTrade> {
    const poolInfo = await this.getPoolInfo({
      tokenIn,
      tokenOut,
      poolFee
    });

    const pool = new Pool(
      tokenIn,
      tokenOut,
      poolFee,
      poolInfo.sqrtPriceX96.toString(),
      poolInfo.liquidity.toString(),
      poolInfo.tick
    );

    const swapRoute = new Route([pool], tokenIn, tokenOut);

    const amountOut = await this.getOutputQuote({ route: swapRoute, tokenIn, amountIn });

    return Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        tokenIn,
        fromReadableAmount(Number(amountIn), tokenIn.decimals).toString()
      ),
      outputAmount: CurrencyAmount.fromRawAmount(tokenOut, JSBI.BigInt(amountOut)),
      tradeType: TradeType.EXACT_INPUT
    });
  }

  private async getPoolInfo({ tokenIn, tokenOut, poolFee = FeeAmount.MEDIUM }: getPoolInfoOptions): Promise<PoolInfo> {
    const currentPoolAddress = computePoolAddress({
      factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
      tokenA: tokenIn,
      tokenB: tokenOut,
      fee: poolFee
    });

    const poolContract = new Contract(currentPoolAddress, IUniswapV3PoolABI.abi, this.provider);

    const [token0, token1, fee, tickSpacing, liquidity, slot0] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0()
    ]);

    return {
      token0,
      token1,
      fee,
      tickSpacing,
      liquidity,
      sqrtPriceX96: slot0[0],
      tick: slot0[1]
    };
  }

  private async getOutputQuote({ route, tokenIn, amountIn }: getOutputQuoteOptions) {
    const { calldata } = SwapQuoter.quoteCallParameters(
      route,
      CurrencyAmount.fromRawAmount(tokenIn, fromReadableAmount(Number(amountIn), tokenIn.decimals)),
      TradeType.EXACT_INPUT,
      {
        useQuoterV2: true
      }
    );

    const quoteCallReturnData = await this.provider.call({
      to: QUOTER_CONTRACT_ADDRESS,
      data: calldata
    });

    return utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData);
  }
}

// Trading Functions

// Helper Quoting and Pool Functions

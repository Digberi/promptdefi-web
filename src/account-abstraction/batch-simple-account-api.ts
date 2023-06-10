import { UserOperationStruct } from '@account-abstraction/contracts';
import { SimpleAccountAPI } from '@account-abstraction/sdk';
import { TransactionDetailsForUserOp } from '@account-abstraction/sdk/dist/src/TransactionDetailsForUserOp';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { utils } from 'ethers';

export type TypeDataFreeTransactionDetails = Omit<TransactionDetailsForUserOp, 'target' | 'value' | 'data'>;

interface TransactionDetailsForUserBatchOp extends TypeDataFreeTransactionDetails {
  target: Array<string>;
  value: Array<BigNumberish>;
  data: Array<string>;
}

export class BatchAccountAPI extends SimpleAccountAPI {
  /**
   * helper method: create and sign a user operation.
   * @param info transaction details for the userOp
   */
  async createSignedUserBatchOp(info: TransactionDetailsForUserBatchOp): Promise<UserOperationStruct> {
    return await this.signUserOp(await this.createUnsignedUserBatchOp(info));
  }

  /**
   * create a UserOperation, filling all details (except signature)
   * - if account is not yet created, add initCode to deploy it.
   * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the account is created)
   * @param info
   */
  async createUnsignedUserBatchOp(info: TransactionDetailsForUserBatchOp): Promise<UserOperationStruct> {
    // eslint-disable-next-line no-debugger
    // debugger;
    const { callData, callGasLimit } = await this.encodeUserBatchOpCallDataAndGasLimit(info);

    const initCode = await this.getInitCode();

    const initGas = await this.estimateCreationGas(initCode);

    const verificationGasLimit = BigNumber.from(await this.getVerificationGasLimit()).add(initGas);

    let { maxFeePerGas, maxPriorityFeePerGas } = info;
    if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
      const feeData = await this.provider.getFeeData();
      if (maxFeePerGas == null) {
        maxFeePerGas = feeData.maxFeePerGas ?? undefined;
      }
      if (maxPriorityFeePerGas == null) {
        maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;
      }
    }

    const nonce = info.nonce ?? (await this.getNonce());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const partialUserOp: any = {
      sender: this.getAccountAddress(),
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData: '0x'
    };

    let paymasterAndData: string | undefined;
    if (this.paymasterAPI != null) {
      // fill (partial) preVerificationGas (all except the cost of the generated paymasterAndData)
      const userOpForPm = {
        ...partialUserOp,
        preVerificationGas: await this.getPreVerificationGas(partialUserOp)
      };
      paymasterAndData = await this.paymasterAPI.getPaymasterAndData(userOpForPm);
    }
    partialUserOp.paymasterAndData = paymasterAndData ?? '0x';

    return {
      ...partialUserOp,
      preVerificationGas: this.getPreVerificationGas(partialUserOp),
      signature: ''
    };
  }

  async encodeUserBatchOpCallDataAndGasLimit(
    detailsForUserOp: TransactionDetailsForUserBatchOp
  ): Promise<{ callData: string; callGasLimit: BigNumber }> {
    try {
      const parseNumber = (a: unknown): BigNumber | null => {
        if (a == null || a === '') {
          return null;
        }

        return BigNumber.from(a.toString());
      };

      const values = detailsForUserOp.value.map(val => parseNumber(val) ?? BigNumber.from(0));
      const callData = await this.encodeExecuteBatch(detailsForUserOp.target, values, detailsForUserOp.data);

      const callGasLimit =
        parseNumber(detailsForUserOp.gasLimit) ??
        (await this.provider.estimateGas({
          from: this.entryPointAddress,
          to: this.getAccountAddress(),
          data: callData
        }));

      return {
        callData,
        callGasLimit
      };
    } catch (e) {
      console.error('error in encodeUserBatchOpCallDataAndGasLimit');
      console.error(e);
      throw e;
    }
  }

  /**
   * encode a method call from entryPoint to our contract
   * @param target
   * @param value
   * @param data
   */
  async encodeExecuteBatch(target: Array<string>, value: Array<BigNumber>, data: Array<string>): Promise<string> {
    const I = new utils.Interface(['function executeBatch(address[] target, uint256[] value, bytes[] data) external']);

    return I.encodeFunctionData('executeBatch', [target, value, data]);
  }
}

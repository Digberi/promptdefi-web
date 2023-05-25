import { UserOperationStruct } from "@account-abstraction/contracts";
import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { TransactionDetailsForUserOp } from "@account-abstraction/sdk/dist/src/TransactionDetailsForUserOp";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

interface TransactionDetailsForUserBatchOp extends Omit<TransactionDetailsForUserOp, 'target' | 'value' | 'data'> {
  target: Array<string>;
  value?: Array<BigNumberish>;
  data: Array<string>;
}

export class BatchAccountAPI extends SimpleAccountAPI {
  /**
 * helper method: create and sign a user operation.
 * @param info transaction details for the userOp
 */
  async createSignedUserBatchOp(info: TransactionDetailsForUserBatchOp): Promise<UserOperationStruct> {
    return await this.signUserOp(await this.createUnsignedUserBatchOp(info))
  }

  /**
 * create a UserOperation, filling all details (except signature)
 * - if account is not yet created, add initCode to deploy it.
 * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the account is created)
 * @param info
 */
  async createUnsignedUserBatchOp(info: TransactionDetailsForUserBatchOp): Promise<UserOperationStruct> {
    const {
      callData,
      callGasLimit
    } = await this.encodeUserBatchOpCallDataAndGasLimit(info)
    const initCode = await this.getInitCode()

    const initGas = await this.estimateCreationGas(initCode)
    const verificationGasLimit = BigNumber.from(await this.getVerificationGasLimit())
      .add(initGas)

    let {
      maxFeePerGas,
      maxPriorityFeePerGas
    } = info
    if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
      const feeData = await this.provider.getFeeData()
      if (maxFeePerGas == null) {
        maxFeePerGas = feeData.maxFeePerGas ?? undefined
      }
      if (maxPriorityFeePerGas == null) {
        maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined
      }
    }

    const partialUserOp: any = {
      sender: this.getAccountAddress(),
      nonce: info.nonce ?? this.getNonce(),
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData: '0x'
    }

    let paymasterAndData: string | undefined
    if (this.paymasterAPI != null) {
      // fill (partial) preVerificationGas (all except the cost of the generated paymasterAndData)
      const userOpForPm = {
        ...partialUserOp,
        preVerificationGas: await this.getPreVerificationGas(partialUserOp)
      }
      paymasterAndData = await this.paymasterAPI.getPaymasterAndData(userOpForPm)
    }
    partialUserOp.paymasterAndData = paymasterAndData ?? '0x'
    return {
      ...partialUserOp,
      preVerificationGas: this.getPreVerificationGas(partialUserOp),
      signature: ''
    }
  }

  async encodeUserBatchOpCallDataAndGasLimit(detailsForUserOp: TransactionDetailsForUserBatchOp): Promise<{ callData: string, callGasLimit: BigNumber }> {
    function parseNumber(a: any): BigNumber | null {
      if (a == null || a === '') return null
      return BigNumber.from(a.toString())
    }

    // const value = detailsForUserOp.value.map(value => parseNumber(value) ?? BigNumber.from(0))
    const callData = await this.encodeExecuteBatch(detailsForUserOp.target, [], detailsForUserOp.data)

    const callGasLimit = parseNumber(detailsForUserOp.gasLimit) ?? await this.provider.estimateGas({
      from: this.entryPointAddress,
      to: this.getAccountAddress(),
      data: callData
    })

    return {
      callData,
      callGasLimit
    }
  }

  /**
 * encode a method call from entryPoint to our contract
 * @param target
 * @param value
 * @param data
 */
  async encodeExecuteBatch(target: Array<string>, value: Array<BigNumber>, data: Array<string>): Promise<string> {
    const accountContract = await this._getAccountContract()
    return accountContract.interface.encodeFunctionData(
      'executeBatch',
      [
        target,
        data
      ])
  }
}

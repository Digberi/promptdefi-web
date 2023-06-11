import { BigNumberish } from 'ethers';

export const preOpToBatchOp = (
  preOp: Array<{
    target: string;
    value?: BigNumberish;
    data: string;
  }>
) => {
  const targets = [];
  const values = [];
  const data = [];

  for (let i = 0; i < preOp.length; i++) {
    const op = preOp[i];
    if (!op.target) {
      throw new Error(`No target address provided in preOp[${i}]`);
    }
    if (!op.data) {
      throw new Error(`No data provided in preOp[${i}]`);
    }
    targets.push(op.target);
    values.push(op.value ?? '0');
    data.push(op.data === 'null' ? '0x' : op.data);
  }

  return {
    target: targets,
    value: values,
    data: data
  };
};

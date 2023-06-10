export async function asyncReduce<T>(
  list: Array<T>,
  callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => Promise<T>
): Promise<T>;
export async function asyncReduce<T>(
  list: Array<T>,
  callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => Promise<T>,
  initialValue: T
): Promise<T>;
export async function asyncReduce<T, U>(
  list: Array<T>,
  callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => Promise<U>,
  initialValue: U
): Promise<U>;
//@ts-ignore
export async function asyncReduce(list, callbackFn, initialValue?) {
  const wrapCallback = async (previousValue: unknown, ...rest: Array<unknown>) => {
    const awaitedPreviousValue = await previousValue;

    return callbackFn(awaitedPreviousValue, ...rest);
  };

  if (initialValue === undefined) {
    return list.reduce(wrapCallback);
  }

  return list.reduce(wrapCallback, Promise.resolve(initialValue));
}

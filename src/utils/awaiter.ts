interface Okay<T> {
  data: T;
  isOk: true;
  error: null;
}

interface Error {
  data: null;
  isOk: false;
  error: Error;
}

type AwaiterResult<T> = Okay<T> | Error;

export const awaiter = async <T>(promise: Promise<T>, condition?: (data: T) => boolean): Promise<AwaiterResult<T>> => {
  try {
    const data = await promise;
    const isOk = condition ? condition(data) : true;
    if (!isOk) {
      throw new Error('Condition not met');
    }

    return {
      data,
      isOk,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      isOk: false,
      error: e as Error
    };
  }
};

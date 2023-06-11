import { useRef } from 'react';

import { useProvider } from 'wagmi';

type Unsubscribe = () => void;
type Callback = (blockNumber: number, unsubscribe: Unsubscribe) => void | Promise<void>;

export function useSubscribeOnBlock(): { subscribe: (callback: Callback) => Unsubscribe | void };
export function useSubscribeOnBlock(callback: Callback): { subscribe: () => Unsubscribe | void };
export function useSubscribeOnBlock(cb?: Callback) {
  const provider = useProvider();
  const callbackRef = useRef<Callback>();

  const Unsubscribe = () => {
    if (!callbackRef.current) {
      return;
    }
    if (!provider) {
      return;
    }

    provider.off('block', callbackRef.current);
    callbackRef.current = undefined;
  };

  const subscribe = (call?: Callback) => {
    if (!provider) {
      return;
    }
    if (call && cb) {
      throw new Error('Cannot pass callback to useSubscribeOnBlock twice');
    }
    if (callbackRef.current) {
      throw new Error('Already subscribed to block events');
    }

    const callback = call || cb;
    if (!callback) {
      throw new Error('Must pass callback to useSubscribeOnBlock');
    }

    callbackRef.current = async (level: number) => callback(level, Unsubscribe);
    provider.on('block', callbackRef.current);

    return Unsubscribe;
  };

  return { subscribe };
}

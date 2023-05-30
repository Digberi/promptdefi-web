import { useNetwork } from 'wagmi';

import { UserAvatar } from './ui';

export const NetworkAvatar = () => {
  const { chain } = useNetwork();

  return <UserAvatar name={chain?.name ?? '??'} />;
};

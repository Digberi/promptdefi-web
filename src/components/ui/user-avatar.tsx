import { ComponentProps, FC } from 'react';

import { Avatar } from '@mui/material';

import { calculateContrastColor } from '@/utils/calculacte-contrast-color';
import { stringToColorHash } from '@/utils/string-to-color-hash';

type AvatarProps = ComponentProps<typeof Avatar>;

const nameToAvatarProps = (name: string, override: AvatarProps) => {
  const bgcolor = stringToColorHash(name);

  const avatarProps: AvatarProps = {
    sx: {
      bgcolor: stringToColorHash(name),
      color: calculateContrastColor(bgcolor),
      textTransform: 'uppercase',
      width: 24,
      height: 24,
      fontSize: 12
    }
  };

  const nameParts = name.split(' ');
  const initials = nameParts.length > 1 ? nameParts.map(part => part[0]).join('') : nameParts[0];

  return {
    ...avatarProps,
    ...override,
    children: initials.slice(0, 2)
  };
};

interface UserAvatarProps extends AvatarProps {
  name: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, ...override }) => (
  <Avatar {...nameToAvatarProps(name, override)} />
);

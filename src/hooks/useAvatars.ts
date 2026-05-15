import { useState } from 'react';
import type { AvatarConfig } from '../types';

const useAvatars = () => {
  const [playerXAvatar, setPlayerXAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Ghost',
  });
  const [playerOAvatar, setPlayerOAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Skull',
  });

  return {
    playerXAvatar,
    setPlayerXAvatar,
    playerOAvatar,
    setPlayerOAvatar,
  };
};

export default useAvatars;

import { useState } from 'react';
import type { AvatarConfig, UseAvatarsReturn } from '../types';

const useAvatars = (): UseAvatarsReturn & {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, player: 'X' | 'O') => void;
} => {
  const [playerXAvatar, setPlayerXAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Ghost',
  });
  const [playerOAvatar, setPlayerOAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Skull',
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: 'X' | 'O',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const value = event.target?.result as string;
      if (player === 'X') setPlayerXAvatar({ type: 'image', value });
      else setPlayerOAvatar({ type: 'image', value });
    };
    reader.readAsDataURL(file);
  };

  return {
    playerXAvatar,
    setPlayerXAvatar,
    playerOAvatar,
    setPlayerOAvatar,
    handleFileUpload,
  };
};

export default useAvatars;

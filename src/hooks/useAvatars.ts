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

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: 'X' | 'O',
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      alert('Unsupported file type. Please upload a PNG, JPG, WEBP, or GIF.');
      e.target.value = '';
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (player === 'X')
          setPlayerXAvatar({ type: 'image', value: reader.result as string });
        else
          setPlayerOAvatar({ type: 'image', value: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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

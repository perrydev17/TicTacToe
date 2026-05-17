import { useState } from 'react';
// @ts-ignore — resolved by React Native project's node_modules
import * as ImagePicker from 'expo-image-picker';
import type { AvatarConfig, UseAvatarsReturn } from '../types';

const useAvatars = (): UseAvatarsReturn & {
  handleFileUpload: (e: any, player: 'X' | 'O') => void;
} => {
  const [playerXAvatar, setPlayerXAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Ghost',
  });
  const [playerOAvatar, setPlayerOAvatar] = useState<AvatarConfig>({
    type: 'icon',
    value: 'Skull',
  });

  const handleFileUpload = async (_e: any, player: 'X' | 'O') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled) return;
    const value = result.assets[0].uri;
    if (player === 'X') setPlayerXAvatar({ type: 'image', value });
    else setPlayerOAvatar({ type: 'image', value });
  };

  return { playerXAvatar, setPlayerXAvatar, playerOAvatar, setPlayerOAvatar, handleFileUpload };
};

export default useAvatars;

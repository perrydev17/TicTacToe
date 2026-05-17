import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import * as Haptics from 'expo-haptics';
import { Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield } from 'lucide-react-native';
import { Player, AvatarConfig } from '@shared/types';
import { colors, players } from '../constants/theme';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield,
};

interface SquareProps {
  value: Player;
  onPress: () => void;
  isWinner: boolean;
  disabled: boolean;
  playerXAvatar: AvatarConfig;
  playerOAvatar: AvatarConfig;
}

function AvatarIcon({ player, avatar }: { player: 'X' | 'O'; avatar: AvatarConfig }) {
  const color = players[player];
  if (avatar.type === 'image') {
    return <Image source={{ uri: avatar.value }} style={styles.avatarImage} />;
  }
  const Icon = ICON_MAP[avatar.value] ?? Ghost;
  return <Icon size={28} color={color} />;
}

export function NativeSquare({ value, onPress, isWinner, disabled, playerXAvatar, playerOAvatar }: SquareProps) {
  const avatar = value === 'X' ? playerXAvatar : playerOAvatar;
  const playerColor = value ? players[value] : null;
  const winnerBorder = isWinner && playerColor ? `${playerColor}99` : colors.borderStrong;
  const winnerBg = isWinner && playerColor ? `${playerColor}18` : colors.surface;
  const wallColor = isWinner && playerColor ? `${playerColor}44` : colors.surfaceMid;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <View style={styles.container}>
      {Platform.OS !== 'android' && (
        <>
          <View style={[styles.sideWall, styles.rightWall, { backgroundColor: wallColor }]} />
          <View style={[styles.sideWall, styles.bottomWall, { backgroundColor: wallColor }]} />
        </>
      )}

      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || !!value}
        activeOpacity={0.7}
        style={[styles.button, { borderColor: winnerBorder, backgroundColor: winnerBg }]}
        accessibilityRole="button"
        accessibilityLabel={value ? `Square occupied by player ${value}` : 'Empty square'}
        accessibilityState={{ disabled: disabled || !!value }}
      >
        <AnimatePresence>
          {value && (
            <MotiView
              from={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <AvatarIcon player={value} avatar={avatar!} />
            </MotiView>
          )}
        </AnimatePresence>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    overflow: 'visible',
  },
  button: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  sideWall: {
    position: 'absolute',
    zIndex: 0,
  },
  rightWall: {
    top: 4,
    right: -10,
    width: 10,
    height: '100%',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  bottomWall: {
    bottom: -10,
    left: 4,
    width: '100%',
    height: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  avatarImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield } from 'lucide-react-native';
import { WinnerInfo, AvatarConfig } from '@shared/types';
import { colors, players } from '../constants/theme';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield,
};

function Avatar({ player, avatar, size = 28 }: { player: 'X' | 'O'; avatar: AvatarConfig; size?: number }) {
  const color = players[player];
  if (avatar.type === 'image') {
    return <Image source={{ uri: avatar.value }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  }
  const Icon = ICON_MAP[avatar.value] ?? Ghost;
  return <Icon size={size} color={color} />;
}

interface Props {
  isXNext: boolean;
  winnerInfo: WinnerInfo | null;
  draw: boolean;
  isAiThinking: boolean;
  playerXAvatar: AvatarConfig;
  playerOAvatar: AvatarConfig;
}

export function NativePlayerStatus({ isXNext, winnerInfo, draw, isAiThinking, playerXAvatar, playerOAvatar }: Props) {
  const getLabel = () => {
    if (winnerInfo?.winner) return `Player ${winnerInfo.winner} Wins!`;
    if (draw) return "It's a Draw";
    if (isAiThinking) return 'AI is thinking…';
    return `Player ${isXNext ? 'X' : 'O'}'s Turn`;
  };

  const activePlayer = winnerInfo?.winner ?? (isXNext ? 'X' : 'O');
  const activeColor = players[activePlayer as 'X' | 'O'] ?? colors.white;

  return (
    <View style={styles.container}>
      <View style={[styles.pill, { borderColor: `${activeColor}40` }]}>
        <View style={[styles.avatarBox, { backgroundColor: `${activeColor}15`, borderColor: `${activeColor}30` }]}>
          <Avatar
            player={activePlayer as 'X' | 'O'}
            avatar={activePlayer === 'X' ? playerXAvatar : playerOAvatar}
            size={22}
          />
        </View>
        <Text
          style={[styles.label, { color: activeColor }]}
          accessibilityLiveRegion="polite"
          accessibilityLabel={getLabel()}
        >
          {getLabel()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colors.surfaceFaint,
  },
  avatarBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    minWidth: 130,
  },
});

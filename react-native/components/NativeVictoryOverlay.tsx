import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { RotateCcw, Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield } from 'lucide-react-native';
import { WinnerInfo, AvatarConfig } from '@shared/types';
import { colors, players } from '../constants/theme';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  Ghost, Skull, Zap, Star, Heart, Flame, Eye, Shield,
};

function Avatar({ player, avatar }: { player: 'X' | 'O'; avatar: AvatarConfig }) {
  const color = players[player];
  if (avatar.type === 'image') {
    return <Image source={{ uri: avatar.value }} style={styles.avatarImage} />;
  }
  const Icon = ICON_MAP[avatar.value] ?? Ghost;
  return <Icon size={48} color={color} />;
}

interface Props {
  winnerInfo: WinnerInfo | null;
  playerXAvatar: AvatarConfig;
  playerOAvatar: AvatarConfig;
  onReset: () => void;
}

export function NativeVictoryOverlay({ winnerInfo, playerXAvatar, playerOAvatar, onReset }: Props) {
  const winner = winnerInfo?.winner;
  const winnerColor = winner ? players[winner] : colors.draw;

  useEffect(() => {
    if (winner) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, []);

  return (
    <Modal transparent animationType="fade">
      <View style={styles.backdrop}>
        <MotiView
          from={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18 }}
          style={styles.card}
        >
          <View style={[styles.avatarCircle, { borderColor: `${winnerColor}40`, backgroundColor: `${winnerColor}10` }]}>
            {winner ? (
              <Avatar player={winner} avatar={winner === 'X' ? playerXAvatar : playerOAvatar} />
            ) : (
              <RotateCcw size={48} color={colors.draw} />
            )}
          </View>

          <Text style={styles.title}>
            {winner ? 'Winner!' : "It's a Draw"}
          </Text>
          <Text style={[styles.subtitle, { color: winnerColor }]}>
            {winner ? `Player ${winner} wins the round` : 'No one claimed victory'}
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={onReset}
            accessibilityRole="button"
            accessibilityLabel="Play again"
          >
            <Text style={styles.btnText}>Play Again</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surfaceSub,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    borderRadius: 40,
    padding: 40,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 36,
    textTransform: 'uppercase',
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 18,
    alignItems: 'center',
  },
  btnText: {
    color: colors.black,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

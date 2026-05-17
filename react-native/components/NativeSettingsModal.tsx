import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { GameMode, GameDifficulty, AvatarConfig } from '@shared/types';
import { colors } from '../constants/theme';
import { SegmentControl } from './SegmentControl';
import { IconPicker, pickImage } from './IconPicker';

interface Props {
  onClose: () => void;
  gameMode: GameMode;
  setGameMode: (m: GameMode) => void;
  difficulty: GameDifficulty;
  setDifficulty: (d: GameDifficulty) => void;
  resetGame: () => void;
  playerXAvatar: AvatarConfig;
  setPlayerXAvatar: (c: AvatarConfig) => void;
  playerOAvatar: AvatarConfig;
  setPlayerOAvatar: (c: AvatarConfig) => void;
}

export function NativeSettingsModal({
  onClose, gameMode, setGameMode, difficulty, setDifficulty,
  resetGame, playerXAvatar, setPlayerXAvatar, playerOAvatar, setPlayerOAvatar,
}: Props) {
  return (
    <Modal transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Close settings"
            >
              <X size={18} color={colors.textSub} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            <Text style={styles.sectionLabel}>Opponent</Text>
            <SegmentControl
              options={[{ label: 'vs AI', value: 'pvc' }, { label: 'vs Player', value: 'pvp' }]}
              value={gameMode}
              onChange={v => { setGameMode(v); resetGame(); }}
              disabledValues={['pvp']}
            />

            {gameMode === 'pvc' && (
              <>
                <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Difficulty</Text>
                <SegmentControl
                  options={[{ label: 'Easy', value: 'Easy' }, { label: 'Hard', value: 'Hard' }]}
                  value={difficulty}
                  onChange={v => { setDifficulty(v); resetGame(); }}
                  optionColors={{ Easy: '#f8ff00', Hard: '#ff14d4' }}
                />
              </>
            )}

            <View style={styles.divider} />

            <IconPicker
              player="X"
              current={playerXAvatar}
              onSelect={name => setPlayerXAvatar({ type: 'icon', value: name })}
              onUpload={() => pickImage(setPlayerXAvatar)}
            />
            <View style={{ height: 20 }} />
            <IconPicker
              player="O"
              current={playerOAvatar}
              onSelect={name => setPlayerOAvatar({ type: 'icon', value: name })}
              onUpload={() => pickImage(setPlayerOAvatar)}
            />
          </ScrollView>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Done"
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.sheetBg,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    maxHeight: '85%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.surfaceMid,
  },
  body: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderFaint,
    marginVertical: 24,
  },
  doneBtn: {
    margin: 24,
    marginTop: 8,
    paddingVertical: 18,
    backgroundColor: colors.white,
    borderRadius: 18,
    alignItems: 'center',
  },
  doneBtnText: {
    color: colors.black,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

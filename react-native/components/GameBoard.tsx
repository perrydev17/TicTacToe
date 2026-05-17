import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import useTicTacToe from '@shared/hooks/useTicTacToe';
import { isDraw } from '@shared/utils';
import { NativeSquare } from './NativeSquare';
import { NativeVictoryOverlay } from './NativeVictoryOverlay';
import { NativePlayerStatus } from './NativePlayerStatus';
import { NativeSettingsModal } from './NativeSettingsModal';
import { Monitor, Settings as SettingsIcon, RotateCcw } from 'lucide-react-native';
import { colors } from '../constants/theme';

export function GameBoard() {
  const {
    squares,
    isXNext,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    winnerInfo,
    isAiThinking,
    showVictoryOverlay,
    showWinnerLine,
    playerXAvatar,
    setPlayerXAvatar,
    playerOAvatar,
    setPlayerOAvatar,
    handleMove,
    resetGame,
  } = useTicTacToe();

  const [showSettings, setShowSettings] = useState(false);
  const draw = isDraw(squares);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Monitor size={20} color={colors.playerX} />
          </View>
          <View>
            <Text style={styles.logoTitle}>Cheddr Tic Tac Toe</Text>
            <Text style={styles.logoSub}>Let's play</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => setShowSettings(true)}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
        >
          <SettingsIcon size={20} color={colors.textSub} />
        </TouchableOpacity>
      </View>

      <NativePlayerStatus
        isXNext={isXNext}
        winnerInfo={winnerInfo}
        draw={draw}
        isAiThinking={isAiThinking}
        playerXAvatar={playerXAvatar}
        playerOAvatar={playerOAvatar}
      />

      <View style={styles.boardWrapper}>
        <View style={styles.isometricGrid} renderToHardwareTextureAndroid={true}>
          {[0, 1, 2].map(row => (
            <View key={row} style={styles.row}>
              {[0, 1, 2].map(col => {
                const i = row * 3 + col;
                return (
                  <NativeSquare
                    key={i}
                    value={squares[i]}
                    onPress={() => handleMove(i)}
                    isWinner={showWinnerLine && (winnerInfo?.line?.includes(i) ?? false)}
                    disabled={!!winnerInfo || draw || (gameMode === 'pvc' && !isXNext)}
                    playerXAvatar={playerXAvatar}
                    playerOAvatar={playerOAvatar}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={resetGame}
        accessibilityRole="button"
        accessibilityLabel="New game"
      >
        <RotateCcw size={16} color={colors.textSub} />
        <Text style={styles.resetText}>NEW GAME</Text>
      </TouchableOpacity>

      {showVictoryOverlay && (
        <NativeVictoryOverlay
          winnerInfo={winnerInfo}
          playerXAvatar={playerXAvatar}
          playerOAvatar={playerOAvatar}
          onReset={resetGame}
        />
      )}

      {showSettings && (
        <NativeSettingsModal
          onClose={() => setShowSettings(false)}
          gameMode={gameMode}
          setGameMode={setGameMode}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          resetGame={resetGame}
          playerXAvatar={playerXAvatar}
          setPlayerXAvatar={setPlayerXAvatar}
          playerOAvatar={playerOAvatar}
          setPlayerOAvatar={setPlayerOAvatar}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 245, 60, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 245, 60, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 2,
  },
  logoSub: {
    color: colors.playerX,
    fontSize: 9,
    letterSpacing: 4,
    fontStyle: 'italic',
  },
  settingsBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.surfaceMid,
    borderWidth: 1,
    borderColor: colors.borderFaint,
  },
  boardWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  isometricGrid: {
    width: 280,
    height: 280,
    overflow: 'visible',
    transform: [
      { perspective: 800 },
      { rotateX: '55deg' },
      { rotateZ: '45deg' },
    ],
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'visible',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderFaint,
    backgroundColor: colors.surfaceFaint,
    marginBottom: 24,
  },
  resetText: {
    color: colors.textSub,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
});

import { useState } from 'react';
import GameHeader from './GameHeader';
import PlayerStatus from './PlayerStatus';
import Square from './Square';
import GameFooter from './GameFooter';
import Settings from './Settings';
import useTicTacToe from '../hooks/useTicTacToe';
import VictoryOverlay from './VictoryOverlay';
import type { SettingsTab } from '../types';
import { isDraw } from '../utils';

const GameBoard = () => {
  const {
    squares,
    isXNext,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    winnerInfo,
    showSettings,
    setShowSettings,
    handleMove,
    resetGame,
    playerXAvatar,
    setPlayerXAvatar,
    playerOAvatar,
    setPlayerOAvatar,
    showVictoryOverlay,
  } = useTicTacToe();

  const [activeSettingsTab, setActiveSettingsTab] =
    useState<SettingsTab>('rules');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      GameBoard
      <GameHeader onOpenSettings={() => setShowSettings(true)} />
      <PlayerStatus
        isXNext={isXNext}
        winnerInfo={winnerInfo}
        playerXAvatar={playerXAvatar}
        playerOAvatar={playerOAvatar}
      />
      <main className="relative w-full max-w-md aspect-square perspective-[2000px] flex items-center justify-center">
        <div
          className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] transition-transform duration-700 ease-out"
          style={{
            transform: 'rotateX(55deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-3 preserve-3d">
            {squares.map((square, idx) => (
              <Square
                key={`${idx}-${square}`}
                value={square}
                onClick={() => handleMove(idx)}
                isWinner={false}
                disabled={
                  !!winnerInfo ||
                  isDraw(squares) ||
                  (gameMode === 'pvc' && !isXNext)
                }
                playerXAvatar={playerXAvatar}
                playerOAvatar={playerOAvatar}
              />
            ))}
          </div>
        </div>
      </main>
      <GameFooter onReset={resetGame} />
      {showVictoryOverlay && (
        <VictoryOverlay
          winnerInfo={winnerInfo}
          playerXAvatar={playerXAvatar}
          playerOAvatar={playerOAvatar}
          onReset={resetGame}
        />
      )}
      {showSettings && (
        <Settings
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
          activeTab={activeSettingsTab}
          setActiveTab={setActiveSettingsTab}
        />
      )}
    </div>
  );
};

export default GameBoard;

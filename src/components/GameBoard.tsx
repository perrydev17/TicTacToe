import React from 'react';
import GameHeader from './GameHeader';
import PlayerStatus from './PlayerStatus';
import Square from './Square';
import GameFooter from './GameFooter';

const dummySquares = new Array(9).fill(0);

const GameBoard = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      GameBoard
      <GameHeader />
      <PlayerStatus />
      <main className="relative w-full max-w-md aspect-square perspective-[2000px] flex items-center justify-center">
        <div
          className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] transition-transform duration-700 ease-out"
          style={{
            transform: 'rotateX(55deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-3 preserve-3d">
            {dummySquares.map((square, idx) => (
              <Square
                key={`${idx}-${square}`}
                value={square}
                onClick={() => {}}
                isWinner={false}
                disabled={false}
              />
            ))}
          </div>
        </div>
      </main>
      <GameFooter onReset={() => {}} />
    </div>
  );
};

export default GameBoard;

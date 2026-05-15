import React from 'react';
import type { Player } from '..//types';

interface SquareProps {
  value?: Player;
  onClick?: () => void;
  isWinner?: boolean | null;
  disabled?: boolean;
}

const Square = ({ value, onClick, isWinner, disabled }: SquareProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      className={`w-full h-full rounded-xl transition-all duration-300 relative
        ${isWinner ? 'bg-white/15 shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-white/30' : 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20'}
        ${!value && !disabled ? 'cursor-pointer' : ''}
      `}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

      {value && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center
              ${value === 'X' ? 'text-cyber-cyan' : 'text-cyber-pink'}
            `}
          >
            X
          </div>
        </div>
      )}
    </button>
  );
};

export default Square;

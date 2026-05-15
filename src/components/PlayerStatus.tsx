import React from 'react';
import type { WinnerInfo } from '../types';

interface PlayerStatusProps {
  isXNext?: boolean;
  winnerInfo?: WinnerInfo | null;
}

const PlayerStatus = ({ isXNext, winnerInfo }: PlayerStatusProps) => {
  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 mb-16 flex justify-between items-center relative z-10 backdrop-blur-md shadow-2xl">
      <div
        className={`flex flex-col items-center transition-all duration-500 ${!isXNext && !winnerInfo ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}`}
      >
        <div className="text-[10px] font-mono text-cyber-cyan mb-2 uppercase tracking-widest font-bold">
          Player [X]
        </div>
        <div
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${isXNext && !winnerInfo ? 'border-cyber-cyan bg-cyber-cyan/10 shadow-[0_0_20px_rgba(0,243,255,0.3)]' : 'border-white/10'}`}
        ></div>
      </div>
      <div className="text-[10px] font-mono text-white/ uppercase tracking-[0.5em] font-bold animate-pulse">
        Versus
      </div>
      <div
        className={`flex flex-col items-center transition-all duration-500 ${isXNext && !winnerInfo ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}`}
      >
        <div className="text-[10px] font-mono text-cyber-pink mb-2 uppercase tracking-widest font-bold">
          CPU [O]
        </div>
        <div
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${!isXNext && !winnerInfo ? 'border-cyber-pink bg-cyber-pink/10 shadow-[0_0_20px_rgba(255,0,255,0.3)]' : 'border-white/10'}`}
        ></div>
      </div>
    </div>
  );
};

export default PlayerStatus;

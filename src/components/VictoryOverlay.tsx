import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { WinnerInfo, AvatarConfig } from '../types';
import DynamicIcon from './DynamicIcon';

interface VictoryOverlayProps {
  winnerInfo: WinnerInfo | null;
  playerXAvatar: AvatarConfig;
  playerOAvatar: AvatarConfig;
  onReset: () => void;
}

const VictoryOverlay = ({
  winnerInfo,
  playerXAvatar,
  playerOAvatar,
  onReset,
}: VictoryOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
      <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative">
        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-150 opacity-50" />
        {winnerInfo?.winner ? (
          <DynamicIcon
            config={winnerInfo.winner === 'X' ? playerXAvatar : playerOAvatar}
            player={winnerInfo.winner}
            className={`w-14 h-14 relative z-10 ${winnerInfo.winner === 'X' ? 'text-cyber-cyan' : 'text-cyber-pink'}`}
          />
        ) : (
          <RotateCcw className="w-12 h-12 text-cyber-yellow relative z-10" />
        )}
      </div>
      <h2 className="text-4xl font-bold uppercase tracking-tight mb-3 text-white">
        {winnerInfo?.winner === 'X'
          ? 'You Win'
          : winnerInfo?.winner === 'O'
            ? 'CPU Wins'
            : 'Draw'}
      </h2>
      <p className="text-[11px] font-mono text-white/40 uppercase tracking-[0.4em] mb-12 bg-white/5 px-6 py-2 rounded-full border border-white/5">
        {winnerInfo?.winner === 'X'
          ? 'Congratulations!'
          : winnerInfo?.winner === 'O'
            ? 'Want to try again?'
            : 'Want to try again?'}
      </p>
      <button
        onClick={onReset}
        className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-cyber-cyan transition-all shadow-xl active:scale-95"
      >
        Restart the Game
      </button>
    </div>
  );
};

export default VictoryOverlay;

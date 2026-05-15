import React from 'react';
import { Monitor, Settings as SettingsIcon } from 'lucide-react';

interface GameHeaderProps {
  onOpenSettings?: () => void;
}

const GameHeader = ({ onOpenSettings }: GameHeaderProps) => {
  return (
    <header className="w-full max-w-md flex justify-between items-center mb-8 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyber-cyan/20 border border-cyber-cyan/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.1)]">
          <Monitor className="text-cyber-cyan w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase leading-none text-white">
            Cheddr - Tic Tac Toe
          </h1>
          {/* <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.3em] uppercase italic">
            Isocore v3.0
          </span> */}
        </div>
      </div>
      <button
        onClick={onOpenSettings}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 shadow-xl"
      >
        {/* <SettingsIcon size={20} className="text-white/60" /> */}
      </button>
    </header>
  );
};

export default GameHeader;

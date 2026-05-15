import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameFooterProps {
  onReset: () => void;
}

const GameFooter = ({ onReset }: GameFooterProps) => {
  return (
    <footer className="mt-24 relative z-10">
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 hover:text-cyber-cyan transition-all py-3 px-8 rounded-xl bg-white/5 border border-white/5 hover:border-cyber-cyan/30 shadow-xl group active:scale-95"
      >
        <RotateCcw
          size={14}
          className="group-hover:rotate-180 transition-transform duration-500"
        />{' '}
        ReTry
      </button>
    </footer>
  );
};

export default GameFooter;

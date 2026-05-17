import React from 'react';
import { motion } from 'motion/react';
import type { Player } from '../types';

interface WinningLineProps {
  line: number[];
  winner: Player;
}

const WinningLine = ({ line, winner }: WinningLineProps) => {
  const rowStart = Math.floor(line[0] / 3);
  const colStart = line[0] % 3;

  const isVertical = line[0] % 3 === line[2] % 3;
  const isHorizontal = Math.floor(line[0] / 3) === Math.floor(line[2] / 3);
  const isDiagonalMain = line[0] === 0 && line[2] === 8;
  const isDiagonalAnti = line[0] === 2 && line[2] === 6;

  const color = winner === 'X' ? '#d4f53c' : '#ff14d4';
  const pos = [15.5, 50, 84.4];
  const zOffset = 48;
  const thickness = 18;

  let style: React.CSSProperties = {
    position: 'absolute',
    transformStyle: 'preserve-3d',
    zIndex: 100,
  };

  let initialTransform = '';
  let animateTransform = '';

  if (isHorizontal) {
    style.width = '100%';
    style.height = thickness;
    style.top = `${pos[rowStart]}%`;
    style.left = '0';
    style.transformOrigin = 'left center';
    initialTransform = 'translateY(-50%) translateZ(0) scaleX(0)';
    animateTransform = `translateY(-50%) translateZ(${zOffset}px) scaleX(1)`;
  } else if (isVertical) {
    style.width = '100%';
    style.height = thickness;
    style.left = `${pos[colStart]}%`;
    style.top = '0';
    style.transformOrigin = '0 0';
    initialTransform = `translateX(${thickness / 2}px) rotateZ(90deg) translateY(-50%) translateZ(0) scaleX(0)`;
    animateTransform = `translateX(${thickness / 2}px) rotateZ(90deg) translateY(-50%) translateZ(${zOffset}px) scaleX(1)`;
  } else if (isDiagonalMain) {
    style.width = '141.42%';
    style.height = thickness;
    style.top = '0';
    style.left = '0';
    style.transformOrigin = '0 0';
    initialTransform =
      'rotateZ(45deg) translateY(-50%) translateZ(0) scaleX(0)';
    animateTransform = `rotateZ(45deg) translateY(-50%) translateZ(${zOffset}px) scaleX(1)`;
  } else if (isDiagonalAnti) {
    style.width = '141.42%';
    style.height = thickness;
    style.top = '0';
    style.right = '0';
    style.transformOrigin = '100% 0';
    initialTransform =
      'rotateZ(-45deg) translateY(-50%) translateZ(0) scaleX(0)';
    animateTransform = `rotateZ(-45deg) translateY(-50%) translateZ(${zOffset}px) scaleX(1)`;
  }

  return (
    <motion.div
      initial={{ transform: initialTransform, opacity: 0 }}
      animate={{ transform: animateTransform, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={style}
      className="overflow-visible"
    >
      <div className="w-full h-full relative preserve-3d">
        <div
          className="absolute inset-x-0 -inset-y-4 rounded-full blur-xl"
          style={{ backgroundColor: color, opacity: 0.15 }}
        />
        <div
          className="absolute inset-y-[30%] inset-x-0 bg-white blur-[1px] rounded-full brightness-200"
          style={{ boxShadow: `0 0 15px white, 0 0 30px ${color}` }}
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1], scaleY: [1, 1.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-full h-full bg-white/50 blur-sm rounded-full"
          />
        </div>
        <motion.div
          animate={{ left: ['-10%', '110%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 -translate-y-1/2 w-20 h-full bg-white/40 blur-md rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default WinningLine;

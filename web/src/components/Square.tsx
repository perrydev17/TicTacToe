import { motion, AnimatePresence } from 'motion/react';
import type { Player, AvatarConfig } from '@shared/types';
import DynamicIcon from './DynamicIcon';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinner: boolean | null;
  disabled: boolean;
  playerXAvatar: AvatarConfig;
  playerOAvatar: AvatarConfig;
}

const Square = ({
  value,
  onClick,
  isWinner,
  disabled,
  playerXAvatar,
  playerOAvatar,
}: SquareProps) => {
  return (
    <div className="relative preserve-3d w-full h-full group">
      <div
        className="absolute top-0 right-0 h-full bg-black/40 border-r border-white/10"
        style={{
          width: '16px',
          transform: 'rotateY(90deg) translateX(8px)',
          transformOrigin: 'right center',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full bg-black/60 border-b border-white/10"
        style={{
          height: '16px',
          transform: 'rotateX(-90deg) translateY(8px)',
          transformOrigin: 'center bottom',
        }}
      />
      <button
        onClick={onClick}
        disabled={disabled || !!value}
        className={`w-full h-full rounded-xl transition-all duration-300 preserve-3d relative
          ${isWinner ? 'bg-white/15 shadow-[0_0_40px_rgba(255,255,255,0.15)] border-white/30' : 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20'}
          ${!value && !disabled ? 'active:translate-z-[-2px] cursor-pointer shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_5px_15px_rgba(0,0,0,0.3)]' : 'shadow-[0_2px_5px_rgba(0,0,0,0.5)]'}
        `}
        style={{ transform: value ? 'translateZ(16px)' : 'translateZ(10px)' }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
        <AnimatePresence mode="wait">
          {value && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center preserve-3d"
            >
              {/* Dynamic Shadow on the board surface */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [1, 0.7, 1],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  opacity: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className={`absolute w-12 h-4 sm:w-16 sm:h-6 rounded-[100%] blur-md pointer-events-none
                    ${value === 'X' ? 'bg-cyber-cyan/40' : 'bg-cyber-pink/40'}
                  `}
                style={{ transform: 'translateY(10px) translateZ(-5px)' }}
              />

              {/* Vertical Standing Icon Entry Wrapper */}
              <motion.div
                initial={{ translateZ: 600, opacity: 0 }}
                animate={{ translateZ: 0, opacity: 1 }}
                transition={{
                  translateZ: {
                    type: 'spring',
                    stiffness: 80,
                    damping: 15,
                    mass: 1.2,
                  },
                  opacity: { duration: 0.3 },
                }}
                className="preserve-3d"
              >
                <motion.div
                  initial={{ height: 600, opacity: 0.4 }}
                  animate={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'circIn' }}
                  className={`absolute left-1/2 -translate-x-1/2 w-1 sm:w-2 pointer-events-none blur-sm
                      ${value === 'X' ? 'bg-cyber-cyan/40' : 'bg-cyber-pink/40'}
                    `}
                  style={{
                    bottom: '50%',
                    transformOrigin: 'bottom',
                    rotateX: -90,
                  }}
                />

                <motion.div
                  animate={{
                    z: [0, 15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative preserve-3d"
                  style={{ rotateX: -90, x: -45, y: -45 }}
                >
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 preserve-3d pointer-events-none flex items-center justify-center">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000
                            ${value === 'X' ? 'text-cyber-cyan' : 'text-cyber-pink'}
                            ${i === 3 ? 'opacity-100 scale-100' : 'opacity-[0.12] brightness-75'}
                          `}
                        style={{
                          transform: `translateZ(${(i - 3) * 4}px)`,
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'visible',
                        }}
                      >
                        <DynamicIcon
                          config={value === 'X' ? playerXAvatar : playerOAvatar}
                          player={value}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default Square;

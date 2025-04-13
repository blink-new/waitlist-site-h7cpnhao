
import { motion } from 'framer-motion';
import { calculateAdjustedPosition } from '../lib/waitlist';
import { WaitlistUser } from '../types';

interface WaitlistPositionProps {
  user: WaitlistUser;
}

export function WaitlistPosition({ user }: WaitlistPositionProps) {
  const adjustedPosition = calculateAdjustedPosition(user);
  
  return (
    <motion.div 
      className="text-center my-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md p-1 mb-4">
        <div className="rounded-full bg-black/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white">
          Your Position
        </div>
      </div>
      <div className="relative">
        <div className="text-9xl font-bold text-white leading-none">
          #{adjustedPosition}
        </div>
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 -z-10 rounded-full scale-75 opacity-70" />
        {user.referralCount > 0 && (
          <motion.div 
            className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 15,
              delay: 0.5
            }}
          >
            -{user.referralCount}
          </motion.div>
        )}
      </div>
      <p className="text-white/70 mt-4 max-w-xs mx-auto">
        {user.referralCount > 0 
          ? `You've moved up ${user.referralCount} ${user.referralCount === 1 ? 'position' : 'positions'} by referring friends!` 
          : 'Refer friends to move up the waitlist!'}
      </p>
    </motion.div>
  );
}
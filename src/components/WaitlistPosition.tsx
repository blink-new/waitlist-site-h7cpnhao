
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
      <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-1 mb-4">
        <div className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
          Your Position
        </div>
      </div>
      <div className="relative">
        <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          #{adjustedPosition}
        </div>
        {user.referralCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -${user.referralCount}
          </div>
        )}
      </div>
      <p className="text-white/70 mt-2">
        {user.referralCount > 0 
          ? `You've moved up ${user.referralCount} ${user.referralCount === 1 ? 'position' : 'positions'} by referring friends!` 
          : 'Refer friends to move up the waitlist!'}
      </p>
    </motion.div>
  );
}
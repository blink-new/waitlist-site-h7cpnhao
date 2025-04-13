
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserByEmail } from '../lib/waitlist';
import { WaitlistPosition } from '../components/WaitlistPosition';
import { ReferralLink } from '../components/ReferralLink';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { ArrowLeft, Users, Share, Award } from 'lucide-react';
import { GradientBlob } from '../components/GradientBlob';
import { ParticlesBackground } from '../components/ParticlesBackground';

export function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [user, setUser] = useState(getUserByEmail(email));
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white p-4">
        <ParticlesBackground />
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold mb-4">User not found</h1>
          <p className="mb-8">We couldn't find your information. Please join the waitlist again.</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      <ParticlesBackground />
      
      {/* Background blobs */}
      <GradientBlob 
        color1="rgba(79, 70, 229, 0.15)" 
        color2="rgba(124, 58, 237, 0.1)" 
        className="-right-40 top-20" 
        size="50rem"
      />
      <GradientBlob 
        color1="rgba(236, 72, 153, 0.1)" 
        color2="rgba(219, 39, 119, 0.15)" 
        className="-left-40 bottom-20" 
        size="50rem"
      />
      
      <header className="py-6 px-4 relative z-10">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            LaunchWave
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="max-w-2xl w-full">
          <motion.div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 -z-10" />
            
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: 0.2
                }}
              >
                <Award className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Waitlist Dashboard
              </motion.h1>
              
              <motion.p 
                className="text-white/70"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Track your position and referrals
              </motion.p>
            </div>
            
            <WaitlistPosition user={user} />
            
            <motion.div 
              className="mt-10 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 -z-10" />
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-medium">Your Referrals</h2>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-3">
                  {user.referralCount}
                </div>
                <p className="text-white/70 text-sm">
                  {user.referralCount === 0 
                    ? "You haven't referred anyone yet" 
                    : `You've referred ${user.referralCount} ${user.referralCount === 1 ? 'person' : 'people'}`}
                </p>
              </div>
              
              {user.referralCount > 0 && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-white/10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-white/70 text-sm">
                    Great job! Keep sharing to move up even faster.
                  </p>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Share className="h-5 w-5 text-indigo-400" />
                <h2 className="text-xl font-bold">Share Your Referral Link</h2>
              </div>
              <p className="text-center text-white/70 mb-4">
                For each friend who joins using your link, you'll move up the waitlist!
              </p>
              <ReferralLink referralCode={user.referralCode} />
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
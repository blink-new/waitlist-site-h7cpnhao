
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserByEmail } from '../lib/waitlist';
import { WaitlistPosition } from '../components/WaitlistPosition';
import { ReferralLink } from '../components/ReferralLink';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { ArrowLeft, Check } from 'lucide-react';
import ReactConfetti from 'react-confetti';

export function SuccessPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const email = location.state?.email || '';
  const isNew = location.state?.isNew || false;
  
  const [user, setUser] = useState(getUserByEmail(email));
  const [showConfetti, setShowConfetti] = useState(isNew);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 5 seconds
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [showConfetti]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">User not found</h1>
          <p className="mb-8">We couldn't find your information. Please join the waitlist again.</p>
          <Link to="/">
            <Button>
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
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            LaunchWave
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <motion.div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {isNew ? "You're on the list!" : "Welcome Back!"}
              </h1>
              <p className="text-white/70">
                {isNew 
                  ? "Thanks for joining our waitlist. Your spot is secured." 
                  : "Good to see you again. Here's your current position."}
              </p>
            </div>
            
            <WaitlistPosition user={user} />
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-center">Share Your Referral Link</h2>
              <p className="text-center text-white/70 mb-4">
                For each friend who joins using your link, you'll move up the waitlist!
              </p>
              <ReferralLink referralCode={user.referralCode} />
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/">
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
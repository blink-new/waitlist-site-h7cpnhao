
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserByEmail } from '../lib/waitlist';
import { WaitlistPosition } from '../components/WaitlistPosition';
import { ReferralLink } from '../components/ReferralLink';
import { Button } from '../components/ui/button';
import { Footer } from '../components/Footer';
import { ArrowLeft, Users } from 'lucide-react';

export function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [user, setUser] = useState(getUserByEmail(email));
  
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
              <h1 className="text-3xl font-bold mb-2">Your Waitlist Dashboard</h1>
              <p className="text-white/70">
                Track your position and referrals
              </p>
            </div>
            
            <WaitlistPosition user={user} />
            
            <div className="mt-8 p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-medium">Your Referrals</h2>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">{user.referralCount}</div>
                <p className="text-white/70 text-sm">
                  {user.referralCount === 0 
                    ? "You haven't referred anyone yet" 
                    : `You've referred ${user.referralCount} ${user.referralCount === 1 ? 'person' : 'people'}`}
                </p>
              </div>
            </div>
            
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
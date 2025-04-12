
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WaitlistForm } from '../components/WaitlistForm';
import { ProductFeatures } from '../components/ProductFeatures';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';
import { ArrowDown } from 'lucide-react';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref') || undefined;
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      <header className={`py-6 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            LaunchWave
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Amazing</span> is Coming Soon
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Join our exclusive waitlist to be among the first to experience our revolutionary product. 
                Refer friends to move up the list and get early access.
              </p>
              
              <WaitlistForm referralCode={referralCode} />
              
              {referralCode && (
                <motion.div 
                  className="mt-4 text-sm text-white/70 bg-white/5 rounded-lg p-2 inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  You were referred by a friend! You'll both move up the waitlist.
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="#features" 
                className="flex flex-col items-center text-white/50 hover:text-white transition-colors"
              >
                <span className="text-sm mb-2">Discover More</span>
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </a>
            </motion.div>
          </div>
        </section>
        
        <section id="features" className="py-16 px-4">
          <div className="container mx-auto">
            <ProductFeatures />
          </div>
        </section>
        
        <section id="how-it-works" className="py-16 px-4">
          <div className="container mx-auto">
            <HowItWorks />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
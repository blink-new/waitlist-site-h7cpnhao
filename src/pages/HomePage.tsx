
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WaitlistForm } from '../components/WaitlistForm';
import { ProductFeatures } from '../components/ProductFeatures';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';
import { ArrowDown } from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { GradientBlob } from '../components/GradientBlob';
import { FloatingElements } from '../components/FloatingElements';
import { AnimatedText } from '../components/AnimatedText';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref') || undefined;
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <ParticlesBackground />
      
      <header className={`py-6 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            LaunchWave
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <motion.section 
          ref={heroRef}
          className="min-h-screen flex items-center pt-20 pb-20 px-4 relative overflow-hidden"
          style={{ opacity, scale }}
        >
          {/* Background elements */}
          <GradientBlob 
            color1="rgba(255, 255, 255, 0.03)" 
            color2="rgba(255, 255, 255, 0.01)" 
            className="-right-40 top-20" 
            size="50rem"
          />
          <GradientBlob 
            color1="rgba(255, 255, 255, 0.01)" 
            color2="rgba(255, 255, 255, 0.03)" 
            className="-left-40 bottom-20" 
            size="50rem"
          />
          <FloatingElements />
          
          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <AnimatedText
                  text="Something Amazing is Coming Soon"
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  highlightWords={["Amazing"]}
                  highlightClass="text-white"
                  delay={0.3}
                />
              </motion.div>
              
              <motion.p 
                className="text-xl text-white/70 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Join our exclusive waitlist to be among the first to experience our revolutionary product. 
                Refer friends to move up the list and get early access.
              </motion.p>
              
              <WaitlistForm referralCode={referralCode} />
              
              {referralCode && (
                <motion.div 
                  className="mt-4 text-sm text-white/70 bg-white/5 backdrop-blur-sm rounded-lg p-3 inline-block border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  You were referred by a friend! You'll both move up the waitlist.
                </motion.div>
              )}
            </div>
            
            <motion.div 
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button 
                onClick={scrollToFeatures}
                className="flex flex-col items-center text-white/50 hover:text-white transition-colors group"
              >
                <span className="text-sm mb-2 group-hover:transform group-hover:translate-y-1 transition-transform">Discover More</span>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ArrowDown className="h-5 w-5 animate-bounce" />
                </div>
              </button>
            </motion.div>
          </div>
        </motion.section>
        
        <section id="features" className="py-16 px-4 relative">
          <div className="container mx-auto">
            <ProductFeatures />
          </div>
        </section>
        
        <section id="how-it-works" className="py-16 px-4 relative">
          <div className="container mx-auto">
            <HowItWorks />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
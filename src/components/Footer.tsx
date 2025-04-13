
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="py-12 border-t border-white/10 mt-auto relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
              LaunchWave
            </div>
            <p className="text-white/50 text-sm">
              © {currentYear} Your Company. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-0">
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">
            Designed with ♥ for the next big thing
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
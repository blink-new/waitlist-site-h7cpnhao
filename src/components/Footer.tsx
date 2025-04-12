
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer 
      className="py-8 border-t border-white/10 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
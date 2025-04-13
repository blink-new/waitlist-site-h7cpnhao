
import { motion } from 'framer-motion';
import { ProductFeature } from '../types';
import { 
  Zap, 
  Shield, 
  Users, 
  Sparkles, 
  Smartphone, 
  Globe 
} from 'lucide-react';
import { FloatingElement } from './FloatingElements';

const features: ProductFeature[] = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Experience blazing fast performance with our optimized architecture.",
    icon: "Zap",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 2,
    title: "Secure by Design",
    description: "Your data is protected with enterprise-grade security and encryption.",
    icon: "Shield",
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 3,
    title: "Collaborative",
    description: "Work seamlessly with your team in real-time, anywhere in the world.",
    icon: "Users",
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    title: "AI-Powered",
    description: "Smart features that learn and adapt to your workflow.",
    icon: "Sparkles",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 5,
    title: "Mobile First",
    description: "Fully responsive design that works beautifully on any device.",
    icon: "Smartphone",
    color: "from-red-400 to-rose-500"
  },
  {
    id: 6,
    title: "Global Access",
    description: "Connect from anywhere with our distributed cloud infrastructure.",
    icon: "Globe",
    color: "from-cyan-400 to-blue-500"
  }
];

const iconMap = {
  Zap: <Zap className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Smartphone: <Smartphone className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />
};

export function ProductFeatures() {
  return (
    <div className="py-16 relative">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
          Discover What's Coming
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          We're building something special. Here's a sneak peek at the features you'll get access to.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all relative z-10 h-full">
              <FloatingElement 
                xMovement={5} 
                yMovement={5} 
                duration={3}
                delay={index * 0.2}
                className="mb-6"
              >
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                  {iconMap[feature.icon as keyof typeof iconMap]}
                </div>
              </FloatingElement>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
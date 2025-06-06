
import { motion } from 'framer-motion';
import { Mail, Share, TrendingUp } from 'lucide-react';
import { GradientBlob } from './GradientBlob';

const steps = [
  {
    id: 1,
    title: "Join the Waitlist",
    description: "Enter your email to secure your spot in line.",
    icon: <Mail className="h-6 w-6" />,
    color: "bg-white text-black"
  },
  {
    id: 2,
    title: "Share with Friends",
    description: "Invite friends using your unique referral link.",
    icon: <Share className="h-6 w-6" />,
    color: "bg-white text-black"
  },
  {
    id: 3,
    title: "Move Up the List",
    description: "Each referral moves you closer to the top of the waitlist.",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-white text-black"
  }
];

export function HowItWorks() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 -z-10" />
      
      {/* Background blobs */}
      <GradientBlob 
        color1="rgba(255, 255, 255, 0.03)" 
        color2="rgba(255, 255, 255, 0.01)" 
        className="-left-20 -top-20" 
      />
      <GradientBlob 
        color1="rgba(255, 255, 255, 0.01)" 
        color2="rgba(255, 255, 255, 0.03)" 
        className="-right-20 -bottom-20" 
        size="30rem"
      />
      
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          How It Works
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Join our waitlist and get early access to our product. The more friends you refer, the sooner you'll get access.
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-16 max-w-5xl mx-auto px-4 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center text-center max-w-xs relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative mb-6">
              <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                {step.icon}
              </div>
              <div className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10 scale-110 opacity-50" />
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
            <p className="text-white/70">{step.description}</p>
            
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-8 h-0.5 bg-white/20">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
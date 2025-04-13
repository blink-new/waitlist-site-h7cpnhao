
import { motion } from 'framer-motion';
import { Mail, Share, TrendingUp } from 'lucide-react';
import { GradientBlob } from './GradientBlob';

const steps = [
  {
    id: 1,
    title: "Join the Waitlist",
    description: "Enter your email to secure your spot in line.",
    icon: <Mail className="h-6 w-6" />,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Share with Friends",
    description: "Invite friends using your unique referral link.",
    icon: <Share className="h-6 w-6" />,
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    id: 3,
    title: "Move Up the List",
    description: "Each referral moves you closer to the top of the waitlist.",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-gradient-to-r from-pink-500 to-pink-600"
  }
];

export function HowItWorks() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 -z-10" />
      
      {/* Background blobs */}
      <GradientBlob 
        color1="rgba(79, 70, 229, 0.1)" 
        color2="rgba(124, 58, 237, 0.05)" 
        className="-left-20 -top-20" 
      />
      <GradientBlob 
        color1="rgba(236, 72, 153, 0.05)" 
        color2="rgba(219, 39, 119, 0.1)" 
        className="-right-20 -bottom-20" 
        size="30rem"
      />
      
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
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
            <div className="relative mb-8 group">
              <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 group-hover:opacity-100 opacity-70 transition-opacity duration-300 scale-[1.2]" />
              
              <div className={`${step.color} rounded-full p-6 mb-4 shadow-lg relative z-10`}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15,
                    delay: 0.2 + index * 0.1
                  }}
                >
                  {step.icon}
                </motion.div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-white/50 to-transparent -translate-y-1/2">
                  <motion.div 
                    className="absolute right-0 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  />
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-white/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
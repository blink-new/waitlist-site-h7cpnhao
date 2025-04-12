
import { motion } from 'framer-motion';
import { Mail, Share, TrendingUp } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Join the Waitlist",
    description: "Enter your email to secure your spot in line.",
    icon: <Mail className="h-6 w-6" />,
    color: "bg-indigo-500"
  },
  {
    id: 2,
    title: "Share with Friends",
    description: "Invite friends using your unique referral link.",
    icon: <Share className="h-6 w-6" />,
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Move Up the List",
    description: "Each referral moves you closer to the top of the waitlist.",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-pink-500"
  }
];

export function HowItWorks() {
  return (
    <div className="py-16 bg-gradient-to-b from-transparent to-black/30">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Join our waitlist and get early access to our product. The more friends you refer, the sooner you'll get access.
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto px-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="relative mb-8">
              <div className={`${step.color} rounded-full p-5 mb-4`}>
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-white/50 to-transparent -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-white rounded-full -translate-y-1/2"></div>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-white/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
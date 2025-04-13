
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
        color1="rgba(255, 255,
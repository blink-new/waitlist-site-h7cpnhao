
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { addToWaitlist, getUserByEmail } from '../lib/waitlist';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

interface WaitlistFormProps {
  referralCode?: string;
}

export function WaitlistForm({ referralCode }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if user already exists
      const existingUser = getUserByEmail(email);
      
      if (existingUser) {
        navigate(`/dashboard/${existingUser.id}`, { state: { email } });
        return;
      }
      
      // Add new user
      const user = addToWaitlist(email, referralCode);
      
      // Navigate to success page
      navigate(`/success/${user.id}`, { state: { email, isNew: true } });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative flex-grow">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 text-base pl-5 pr-4 rounded-xl border-white/10 bg-white/5 backdrop-blur-md focus:border-indigo-500 focus:ring-indigo-500 transition-all"
          required
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 -z-10 blur-sm transform scale-[1.03] opacity-70" />
      </div>
      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="h-14 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    </motion.form>
  );
}
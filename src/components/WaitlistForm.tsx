
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { addToWaitlist, getUserByEmail } from '../lib/waitlist';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/use-toast';

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
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 text-base"
        required
      />
      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
    </motion.form>
  );
}
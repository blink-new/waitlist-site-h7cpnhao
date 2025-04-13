
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'framer-motion';
import { Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ReferralLinkProps {
  referralCode: string;
}

export function ReferralLink({ referralCode }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const referralLink = `${window.location.origin}?ref=${referralCode}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive"
      });
    }
  };
  
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join our waitlist!',
          text: 'I just joined this exciting new product waitlist. Join through my referral link to get early access!',
          url: referralLink,
        });
        toast({
          title: "Shared successfully!",
          description: "Thanks for sharing our waitlist",
        });
      } catch (err) {
        // User probably canceled the share
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row gap-3 relative">
        <div className="relative flex-grow">
          <Input
            value={referralLink}
            readOnly
            className="h-12 text-sm bg-white/5 backdrop-blur-sm border-white/10 rounded-xl pl-4 pr-4"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 -z-10 blur-sm transform scale-[1.03] opacity-70" />
        </div>
        <Button 
          onClick={copyToClipboard} 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
        >
          {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={shareLink} 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-center mt-3 text-white/70">
        Share this link with friends to move up the waitlist!
      </p>
    </motion.div>
  );
}
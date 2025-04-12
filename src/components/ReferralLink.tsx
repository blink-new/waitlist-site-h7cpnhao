
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
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={referralLink}
          readOnly
          className="h-12 text-sm bg-white/10 border-white/20"
        />
        <Button 
          onClick={copyToClipboard} 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 border-white/20 bg-white/10 hover:bg-white/20"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={shareLink} 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 border-white/20 bg-white/10 hover:bg-white/20"
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
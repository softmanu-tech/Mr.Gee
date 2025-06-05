
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Users, Copy, Share2, Award, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { useCoinBalance, ReferralInfo } from "@/hooks/use-coin-balance";
import { useToast } from "@/hooks/use-toast";

const ReferralSystem: React.FC = () => {
  const { referralInfo, addReferral } = useCoinBalance();
  const { toast } = useToast();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // For demo purposes, we'll simulate a referral when clicking the "Test Referral" button
  const simulateReferral = () => {
    const coinsEarned = addReferral();
    
    if (coinsEarned === 0) {
      toast({
        title: "Referral Recorded",
        description: `You now have ${referralInfo.referrals + 1} referrals. Get 10 referrals to earn 50 coins!`,
        duration: 3000
      });
    }
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      toast({
        title: "Copied to Clipboard",
        description: `${type === 'link' ? 'Referral link' : 'Referral code'} copied!`,
        duration: 2000
      });
      
      setTimeout(() => setCopiedText(null), 2000);
    });
  };
  
  // Calculate progress to next reward
  const nextMilestone = Math.ceil(referralInfo.referrals / 10) * 10;
  const progress = ((referralInfo.referrals % 10) / 10) * 100;
  
  // Generate the referral link (in a real app, this would be your domain + code)
  const referralLink = `https://mrgee.app/signup?ref=${referralInfo.code}`;
  
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-cinzen">Refer Friends, Earn Coins</h2>
          <p className="text-foreground/70 mt-2 max-w-xl mx-auto">
            Share your referral code with friends. For every 10 people who sign up with your code, you'll earn 50 coins!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="md:col-span-2 glass-effect border border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-400" />
                Your Referral Stats
              </CardTitle>
              <CardDescription>
                Track your referrals and earnings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Your Referral Code</p>
                  <div className="flex items-center mt-1">
                    <code className="bg-background px-2 py-1 rounded text-lg font-bold">
                      {referralInfo.code}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyToClipboard(referralInfo.code, 'code')}
                      className="ml-2"
                    >
                      <Copy className={`h-4 w-4 ${copiedText === 'code' ? 'text-green-500' : ''}`} />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-3xl font-bold">{referralInfo.referrals}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next reward (50 coins)</span>
                  <span>{referralInfo.referrals % 10} of 10 referrals</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Share your referral link:</p>
                <div className="flex space-x-2">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(referralLink, 'link')}
                  >
                    <Copy className={`h-4 w-4 mr-2 ${copiedText === 'link' ? 'text-green-500' : ''}`} />
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-4">
              <p className="text-sm">
                <span className="font-medium">{referralInfo.totalEarned}</span> coins earned from referrals
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={simulateReferral}
              >
                <Gift className="h-4 w-4" />
                Test Referral
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-effect border border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-400" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-500/10 rounded-full p-2 mr-3">
                  <Share2 className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Share Your Code</p>
                  <p className="text-sm text-muted-foreground">Send your unique code to friends</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500/10 rounded-full p-2 mr-3">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Friends Sign Up</p>
                  <p className="text-sm text-muted-foreground">They enter your code during registration</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500/10 rounded-full p-2 mr-3">
                  <Gift className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Earn Rewards</p>
                  <p className="text-sm text-muted-foreground">Get 50 coins for every 10 referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReferralSystem;

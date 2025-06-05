
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ReferralInfo {
  code: string;
  referrals: number;
  totalEarned: number;
}

export function useCoinBalance() {
  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [referralInfo, setReferralInfo] = useState<ReferralInfo>({
    code: '',
    referrals: 0,
    totalEarned: 0
  });
  const { toast } = useToast();

  // Initialize with stored values on component mount
  useEffect(() => {
    const storedBalance = localStorage.getItem('coinBalance');
    if (storedBalance) {
      setCoinBalance(parseInt(storedBalance, 10));
    }
    
    const storedReferralInfo = localStorage.getItem('referralInfo');
    if (storedReferralInfo) {
      setReferralInfo(JSON.parse(storedReferralInfo));
    } else {
      // Generate a unique referral code if none exists
      const newCode = generateReferralCode();
      setReferralInfo(prev => ({ ...prev, code: newCode }));
      localStorage.setItem('referralInfo', JSON.stringify({ ...referralInfo, code: newCode }));
    }
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('coinBalance', coinBalance.toString());
    localStorage.setItem('referralInfo', JSON.stringify(referralInfo));
  }, [coinBalance, referralInfo]);

  const addCoins = useCallback((amount: number) => {
    setCoinBalance(prev => prev + amount);
    toast({
      title: "Coins Added",
      description: `${amount} coins have been added to your balance.`,
      duration: 3000
    });
  }, [toast]);

  const addReferral = useCallback(() => {
    const newReferrals = referralInfo.referrals + 1;
    let coinsEarned = 0;
    
    // Check if user has reached a milestone (every 10 referrals)
    if (newReferrals % 10 === 0) {
      coinsEarned = 50;
      setCoinBalance(prev => prev + coinsEarned);
      
      toast({
        title: "Referral Bonus!",
        description: `You've reached ${newReferrals} referrals! 50 coins have been added to your balance.`,
        duration: 5000
      });
    }
    
    setReferralInfo(prev => ({
      ...prev,
      referrals: newReferrals,
      totalEarned: prev.totalEarned + coinsEarned
    }));
    
    return coinsEarned;
  }, [referralInfo, toast]);

  const spendCoins = useCallback((cost: number) => {
    if (coinBalance < cost) {
      toast({
        title: "Insufficient Coins",
        description: "You don't have enough coins to access this content.",
        variant: "destructive"
      });
      return false;
    }

    setCoinBalance(prev => prev - cost);
    toast({
      title: "Coin Spent",
      description: `${cost} coins were used to access premium content.`,
      duration: 3000
    });
    return true;
  }, [coinBalance, toast]);

  return { 
    coinBalance, 
    referralInfo, 
    addCoins, 
    spendCoins, 
    addReferral 
  };
}

// Helper function to generate a unique referral code
function generateReferralCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

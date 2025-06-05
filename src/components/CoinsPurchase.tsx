import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ArrowRight, CheckCircle2, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMpesaPayment } from "@/hooks/use-mpesa-payment";
import { motion } from 'framer-motion';

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  popular?: boolean;
}

const coinPackages: CoinPackage[] = [
  { id: "basic", name: "Basic", coins: 50, price: 200, },
  { id: "standard", name: "Standard", coins: 150, price: 500, popular: true },
  { id: "premium", name: "Premium", coins: 350, price: 1000 },
];

const CoinsPurchase: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>(coinPackages[1].id);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  
  const { 
    isLoading, 
    isSuccess, 
    isError, 
    initiatePayment, 
    resetPaymentState 
  } = useMpesaPayment();
  
  const handlePurchase = () => {
    setShowPaymentDialog(true);
  };

  const handleInitiatePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    const selectedPkg = coinPackages.find(pkg => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    try {
      await initiatePayment({
        amount: selectedPkg.price,
        phoneNumber: phoneNumber,
        accountReference: `MrGee-Coins-${selectedPkg.id}`,
        description: `Purchase of ${selectedPkg.coins} coins`
      });
      
    } catch (error) {
    }
  };

  const closeDialog = () => {
    setShowPaymentDialog(false);
    resetPaymentState();
    setPhoneNumber("");
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h5 className="text-purple-300 font-cinzen mb-2">Access Premium Content</h5>
          <h2 className="text-3xl md:text-4xl font-bold font-cinzen">Buy Coins with MPesa</h2>
          <p className="text-foreground/70 mt-4 max-w-xl mx-auto">
            Purchase coins using Kenya's MPesa payment system and unlock premium tracks and exclusive content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {coinPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card 
                className={`bg-card border ${
                  selectedPackage === pkg.id 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                    : 'border-border hover:border-purple-500/50'
                } transition-all duration-300 relative overflow-hidden`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-accent py-1 text-center text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <CardHeader className={pkg.popular ? 'pt-8' : ''}>
                  <CardTitle className="font-cinzen text-xl">{pkg.name} Pack</CardTitle>
                  <CardDescription>
                    {pkg.coins} coins
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-4">
                    KSh {pkg.price}
                    <span className="text-sm text-muted-foreground font-normal"> via MPesa</span>
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Access to exclusive tracks
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      High-quality audio
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Support the artist directly
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPackage === pkg.id ? 'default' : 'outline'} 
                    className={selectedPackage === pkg.id ? 'bg-gradient-to-r from-purple-500 to-accent w-full' : 'w-full'}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {selectedPackage === pkg.id ? (
                      <>Select Package <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      'Select Package'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            size="lg" 
            onClick={handlePurchase}
            className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90 transition-opacity"
          >
            <Coins className="mr-2 h-5 w-5" /> Complete Purchase with MPesa
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Secure payments powered by MPesa. Your coins will be added immediately after payment.
          </p>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment with MPesa</DialogTitle>
            <DialogDescription>
              Enter your phone number to receive the MPesa payment prompt.
            </DialogDescription>
          </DialogHeader>
          
          {!isSuccess ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <div className="col-span-3 flex">
                    <span className="flex items-center bg-muted px-3 rounded-l-md border border-r-0 border-input">
                      +254
                    </span>
                    <Input
                      id="phone"
                      placeholder="7XXXXXXXX"
                      className="rounded-l-none focus-visible:ring-offset-0"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground">
                    Amount: KSh {coinPackages.find(pkg => pkg.id === selectedPackage)?.price || 0}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={closeDialog} variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleInitiatePayment} 
                  className="bg-gradient-to-r from-purple-500 to-accent"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>Pay with MPesa <Smartphone className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Payment Request Sent</h3>
              <p className="text-center text-muted-foreground">
                Check your phone for the MPesa prompt to complete the payment.
                Your coins will be credited once the payment is confirmed.
              </p>
              <Button 
                onClick={closeDialog} 
                className="mt-4 bg-gradient-to-r from-purple-500 to-accent"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CoinsPurchase;

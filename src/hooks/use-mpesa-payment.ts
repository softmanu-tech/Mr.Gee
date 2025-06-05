
import { useState } from "react";
import { 
  MpesaPaymentRequest, 
  MpesaPaymentResponse, 
  MpesaCredentials,
  initiateStk,
  simulateMpesaPayment
} from "@/utils/mpesaApi";
import { useToast } from "@/hooks/use-toast";

// This is for development purposes only - in production these would be securely stored
const DEFAULT_CREDENTIALS: MpesaCredentials = {
  consumerKey: "YOUR_CONSUMER_KEY", // Replace in production
  consumerSecret: "YOUR_CONSUMER_SECRET", // Replace in production
  passKey: "YOUR_PASS_KEY", // Replace in production
  shortCode: "174379" // Replace with your shortcode
};

export interface PaymentState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  response: MpesaPaymentResponse | null;
}

export function useMpesaPayment() {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    response: null
  });

  const { toast } = useToast();

  const initiatePayment = async (paymentDetails: MpesaPaymentRequest) => {
    setPaymentState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      errorMessage: null,
      response: null
    });

    try {
      // In development, use simulation instead of actual API call
      // In production, use: const response = await initiateStk(DEFAULT_CREDENTIALS, paymentDetails);
      const response = await simulateMpesaPayment(paymentDetails.phoneNumber, paymentDetails.amount);
      
      setPaymentState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: null,
        response
      });

      toast({
        title: "M-Pesa Request Sent",
        description: "Check your phone for the M-Pesa prompt to complete payment.",
        duration: 5000,
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to process payment";
      
      setPaymentState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage,
        response: null
      });

      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });

      throw error;
    }
  };

  const resetPaymentState = () => {
    setPaymentState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: null,
      response: null
    });
  };

  return {
    ...paymentState,
    initiatePayment,
    resetPaymentState
  };
}

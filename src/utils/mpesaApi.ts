
// This file contains functions to interact with the M-Pesa Daraja API

export interface MpesaCredentials {
  consumerKey: string;
  consumerSecret: string;
  passKey: string;
  shortCode: string;
}

export interface MpesaPaymentRequest {
  amount: number;
  phoneNumber: string;
  accountReference: string;
  description: string;
}

export interface MpesaAuthResponse {
  access_token: string;
  expires_in: string;
}

export interface MpesaPaymentResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

const MPESA_AUTH_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const MPESA_STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

// Get OAuth token
export const getMpesaAuthToken = async (credentials: MpesaCredentials): Promise<string> => {
  try {
    const auth = Buffer.from(`${credentials.consumerKey}:${credentials.consumerSecret}`).toString('base64');
    
    const response = await fetch(MPESA_AUTH_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get M-Pesa auth token');
    }
    
    const data: MpesaAuthResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting M-Pesa auth token:', error);
    throw error;
  }
};

// Generate timestamp in the format YYYYMMDDHHmmss
export const generateTimestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// Generate password for the STK push
export const generatePassword = (credentials: MpesaCredentials, timestamp: string): string => {
  const password = Buffer.from(`${credentials.shortCode}${credentials.passKey}${timestamp}`).toString('base64');
  return password;
};

// Initialize STK Push (Lipa Na M-Pesa Online)
export const initiateStk = async (
  credentials: MpesaCredentials, 
  paymentDetails: MpesaPaymentRequest
): Promise<MpesaPaymentResponse> => {
  try {
    const accessToken = await getMpesaAuthToken(credentials);
    const timestamp = generateTimestamp();
    const password = generatePassword(credentials, timestamp);
    
    // Format phone number (remove leading 0 or +254)
    let phoneNumber = paymentDetails.phoneNumber.replace(/^0|^\+254/, '');
    // Add 254 prefix
    phoneNumber = `254${phoneNumber}`;
    
    const requestBody = {
      BusinessShortCode: credentials.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: paymentDetails.amount,
      PartyA: phoneNumber,
      PartyB: credentials.shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${window.location.origin}/api/mpesa/callback`,
      AccountReference: paymentDetails.accountReference,
      TransactionDesc: paymentDetails.description
    };
    
    const response = await fetch(MPESA_STK_PUSH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error('Failed to initiate M-Pesa STK push');
    }
    
    const data: MpesaPaymentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error);
    throw error;
  }
};

// Function to simulate M-Pesa API calls in development without actual API keys
export const simulateMpesaPayment = async (
  phoneNumber: string,
  amount: number
): Promise<MpesaPaymentResponse> => {
  console.log(`Simulating M-Pesa payment for ${phoneNumber} with amount ${amount}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock response
  return {
    MerchantRequestID: `${Math.random().toString(36).substring(2, 15)}`,
    CheckoutRequestID: `ws_CO_${Date.now()}${Math.floor(Math.random() * 1000)}`,
    ResponseCode: "0",
    ResponseDescription: "Success. Request accepted for processing",
    CustomerMessage: "Success. Request accepted for processing"
  };
};

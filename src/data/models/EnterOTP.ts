export interface SendOTP {
  identifier: string; // used for send-otp API
}

export interface EnterOTP {
  identifier: string; // used for verify-otp API
  otp: string;
}

export interface ResendOTP {
  identifier: string; // used for resend-otp API
}

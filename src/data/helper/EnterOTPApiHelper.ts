
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

import { SendOTP, EnterOTP, ResendOTP } from '../models/EnterOTP'; // ✅ Match casing exactly

import { Response } from '../models/response';

// Verify OTP
export const verifyOTP = async (data: EnterOTP): Promise<Response<any>> => {
  try {
    const res = await axios.post(`${BASE_URL}/users/verify-otp`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.data) throw err.response.data;
    throw new Error(err.message || 'OTP verification failed');
  }
};

// Resend OTP
export const resendOTP = async (data: ResendOTP): Promise<Response<any>> => {
  try {
    const res = await axios.post(`${BASE_URL}/users/resend-otp`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.data) throw err.response.data;
    throw new Error(err.message || 'OTP resend failed');
  }
};

// Send OTP (optional - if needed)
export const sendOTP = async (data: SendOTP): Promise<Response<any>> => {
  try {
    const res = await axios.post(`${BASE_URL}/users/send-otp`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err: any) {
    if (err.response?.data) throw err.response.data;
    throw new Error(err.message || 'OTP send failed');
  }
};

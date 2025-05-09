// src/data/service/otpApi.ts

import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../utils/constants';
import { Response } from '../models/response';

// ✅ Common OTP interfaces
export interface SendOTP {
  identifier: string;
}

export interface EnterOTP {
  identifier: string;
  otp: string;
}

export interface ResendOTP {
  identifier: string;
}

/**
 * ✅ Send OTP to email or phone
 */
export const sendOtp = async (
  data: SendOTP
): Promise<Response<any>> => {
  try {
    const res: AxiosResponse<Response<any>> = await axios.post(
      `${BASE_URL}/users/send-otp`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (err: any) {
    console.error("sendOtp error:", err?.response?.data || err.message);
    throw new Error(err?.response?.data?.message || "Failed to send OTP");
  }
};

/**
 * ✅ Verify the one‑time password
 */
export const verifyOTP = async (
  data: EnterOTP
): Promise<Response<any>> => {
  try {
    const res: AxiosResponse<Response<any>> = await axios.post(
      `${BASE_URL}/users/verify-otp`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (err: any) {
    if (err.response?.data) {
      throw new Error((err.response.data as Response<any>).message);
    }
    throw new Error(err.message || 'OTP verification failed');
  }
};

/**
 * ✅ Ask the backend to resend the one‑time password
 */
export const resendOTP = async (
  data: ResendOTP
): Promise<Response<any>> => {
  try {
    const res: AxiosResponse<Response<any>> = await axios.post(
      `${BASE_URL}/users/resend-otp`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (err: any) {
    if (err.response?.data) {
      throw new Error((err.response.data as Response<any>).message);
    }
    throw new Error(err.message || 'OTP resend failed');
  }
};

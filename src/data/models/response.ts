// src/data/models/response.ts

import { ReactNode } from "react";
import { UserCountByRole } from "./RoleCount";

// ✅ Generic API response
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

// ✅ Standard response used across services
export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ✅ Authentication
export interface LoginData {
  token: string;
  uuid: string;
  role: string;
}

export interface SignUp {
  name: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  signupType: string;
  role: string;
  status: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
  password: string;
}

// ✅ OTP Request & Responses (All use `identifier`)
export interface SendOTPRequest {
  identifier: string;
}

export interface SendOTPResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface VerifyOTPRequest {
  identifier: string;
  otp: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user?: {
      uuid: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

export interface ResendOTPRequest {
  identifier: string;
}

export interface ResendOTPResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// ✅ User/Profile
export interface Data {
  name: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
  signupType: string;
  deviceToken: string;
  role: string;
  status: string;
  _id: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProfileUpdateResponse<T> {
  message: string;
  data: T;
  success: boolean;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ✅ Dashboard & Metrics
export interface DashboardCountResponse {
  users: number;
  bank: number;
  device: number;
}

export interface UserCountResponse 
  {
    user: 1,
    superAdmin: 1,
    systemIntegrator: 2
  }


export interface UserListDetails<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ✅ App Settings
export interface Settings {
  name: string;
  description: string;
  theme: string;
  notification: string;
  status: string;
}

// ✅ Commands (Device/Feature Related)
export interface Command {
  message: ReactNode;
  featureUuid: string;
  uuid: string;
  name: string;
  description: string;
}

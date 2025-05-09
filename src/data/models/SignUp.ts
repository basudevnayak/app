export interface SignUp {
  name: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  signupType: 'email' | 'phone';
  role: string;
}

export interface UpdateProfile {
  name: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
  signupType: 'email' | 'phone';
  role: string;
  deviceToken: string;
  file: null | string; // assuming it will be a URL or base64 later
}

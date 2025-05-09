export const isMinLength = (password: string) => password.length >= 8;

export const hasUppercase = (password: string) => /[A-Z]/.test(password);

export const hasNumber = (password: string) => /\d/.test(password); // ✅ FIXED

export const hasSpecialChar = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password);

export const isStrongPassword = (password: string): boolean =>
  isMinLength(password) &&
  hasUppercase(password) &&
  hasNumber(password) &&
  hasSpecialChar(password);

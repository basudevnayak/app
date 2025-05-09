// File: src/utils/validation/passwordValidators.ts

export const isMinLength = (password: string) => password.length >= 8;
export const hasUppercase = (password: string) => /[A-Z]/.test(password);
export const hasNumber = (password: string) => /\d/.test(password);
export const hasSpecialChar = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password);

export const getPasswordValidationStatus = (password: string) => ({
  minLength: isMinLength(password),
  uppercase: hasUppercase(password),
  number: hasNumber(password),
  specialChar: hasSpecialChar(password),
});

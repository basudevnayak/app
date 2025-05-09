// Validates standard email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Validates Indian-style 10-digit phone numbers (not starting with 0)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[1-9][0-9]{9}$/;
  return phoneRegex.test(phone.trim());
};

// Returns error message for invalid email or phone input
export const getValidationError = (input: string): string => {
  const trimmed = input.trim();

  const isEmail = trimmed.includes("@");
  const isDigitsOnly = /^\d+$/.test(trimmed);

  if (isEmail) {
    return validateEmail(trimmed) ? "" : "Please enter a valid email address";
  }

  if (isDigitsOnly) {
    if (trimmed.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }
    if (trimmed.startsWith("0")) {
      return "Phone number should not start with 0";
    }
    return "";
  }

  return "Please enter a valid email or 10-digit phone number";
};

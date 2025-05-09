export const validatePhone = (phone: string): string | null => {
  // Remove any non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check if the phone number starts with +91
  if (!cleaned.startsWith('+91')) {
    return 'Phone number must start with +91';
  }

  // Check if the phone number is exactly 13 characters (+91 + 10 digits)
  if (cleaned.length !== 13) {
    return 'Phone number must be 10 digits after +91';
  }

  // Check if the remaining digits are valid
  const digits = cleaned.slice(3); // Remove +91
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return 'Invalid Indian mobile number format';
  }

  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
};

export const validateDOB = (dob: string): string | null => {
  const regex = /^\d{2}-\d{2}-\d{4}$/; // Check if DOB is in DD-MM-YYYY format
  if (!regex.test(dob)) {
    return 'Date of Birth must be in DD-MM-YYYY format';
  }

  const [day, month, year] = dob.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const isValidDate = date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;

  if (!isValidDate) {
    return 'Please enter a valid date';
  }

  if (age < 18) {
    return 'You must be at least 18 years old';
  }

  if (age > 100) {
    return 'Please enter a valid date of birth';
  }

  return null;
};

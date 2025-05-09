// src/utils/validation/FormValidationHelper.ts

// ---- Types ---- //

export interface FormFields {
    [key: string]: string;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }
  
  export interface FieldValidationRules {
    [key: string]: (value: string, form?: FormFields) => string | undefined;
  }
  
  // ---- Generic Form Validation Function ---- //
  
  export const validateForm = (form: FormFields, validationRules: FieldValidationRules): FormErrors => {
    const errors: FormErrors = {};
  
    for (const field in validationRules) {
      const validator = validationRules[field];
      const error = validator(form[field], form);
      if (error) {
        errors[field] = error;
      }
    }
  
    return errors;
  };
  
  // ---- Common Reusable Validators ---- //
  
  export const Validators = {
    required: (message = "This field is required") => (value: string) => {
      if (!value?.trim()) return message;
    },
  
    email: (value: string) => {
      if (!validateEmail(value)) return "Please enter a valid email address";
    },
  
    phone: (value: string) => {
      if (!validatePhone(value)) return "Enter a valid 10-digit phone number";
    },
  
    password: (value: string) => {
      if (!validatePassword(value)) return "Password must be at least 8 characters";
    },
  
    strongPassword: (value: string) => {
      if (!isStrongPassword(value)) return "Password is not strong enough.";
    },
  
    matchField: (fieldToMatch: string, message = "Fields do not match") => (value: string, form?: FormFields) => {
      if (value !== form?.[fieldToMatch]) return message;
    },
  };
  
  // ---- Basic Validator Implementations ---- //
  
  // Validates standard email format
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  
  // Validates Indian-style 10-digit phone numbers (starting 6-9 only)
  export const validatePhone = (phone: string): boolean => {
    const trimmed = phone.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(trimmed);
  };
  
  // Basic password rule: minimum 8 characters (You can improve further if needed)
  export const validatePassword = (password: string): boolean => {
    return password.trim().length >= 8;
  };
  
  // Strong password: 8+ chars, at least one uppercase, one number, one special char
  export const isStrongPassword = (password: string): boolean => {
    const strongRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password.trim());
  };
  
  // ---- Special Case: Email or Phone Field Validation ---- //
  
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
      if (!validatePhone(trimmed)) {
        return "Phone number must start with 6-9 and be valid";
      }
      return "";
    }
  
    return "Please enter a valid email or 10-digit phone number";
  };
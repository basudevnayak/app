export interface TermsAndConditions {
  content: string[];
  terms?: string;
  status?: string;
  message?: string;
}


// Example of expected API response structure
const exampleResponse = {
  status: "success",
  message: "Terms and conditions retrieved successfully",
  content: [
    "1. Acceptance of Terms",
    "By accessing and using this application, you accept and agree to be bound by the terms and conditions of this agreement.",
    "2. Use License",
    "Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only.",
    "3. Disclaimer",
    "The materials on the application are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    "4. Limitations",
    "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the application."
  ]
};

  
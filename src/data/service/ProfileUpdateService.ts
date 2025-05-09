import axios from 'axios';
import { ProfileUpdate } from '../models/ProfileUpdate';
import { ProfileUpdateResponse } from '../models/response';
import { handleProfileUpdate } from '../helper/ProfileUpdateHelper';

export const updateProfile = async (uuid: string, profile: ProfileUpdate): Promise<ProfileUpdateResponse<ProfileUpdate>> => {
  try {
    const formData = await handleProfileUpdate(uuid, profile);
    
    // Make the API request
    const response = await axios.put(`http://techlambda.com:7500/users/${uuid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return a properly structured response
    return {
      message: 'Profile updated successfully',
      data: response.data,  // The actual profile data returned from the API
      success: true,
    };
  } catch (error: any) {
    // Handle the error
    console.error('Profile update failed:', error?.response?.data || error.message);
    return {
      message: 'Profile update failed',
      data: error?.response?.data || {},
      success: false,
    };
  }
};

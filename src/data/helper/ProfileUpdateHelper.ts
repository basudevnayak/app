import { updateProfile } from '../service/ProfileUpdateService';
import { ProfileUpdate } from '../models/ProfileUpdate';
import { ProfileUpdateResponse } from '../models/response';

export const handleProfileUpdate = async (uuid: string, payload: ProfileUpdate): Promise<ProfileUpdateResponse<ProfileUpdate>> => {
  try {
    const response = await updateProfile(uuid, payload);
    return response;
  } catch (error: any) {
    console.error('Profile update failed:', error?.response?.data || error.message);
    throw new Error('Profile update failed. Please try again later.');
  }
};

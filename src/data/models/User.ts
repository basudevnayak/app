export interface User {
  uuid: string,
  name: string,
  dob: string,
  email: string,
  phone: string,
  password: string,
  signupType: string,
  deviceToken: string,
  profilePicture?:string
  file?:string,
  role?: string,
  _id?: string
  token?: string;
  stsTokenManager?: {
    accessToken?: string;
}
}
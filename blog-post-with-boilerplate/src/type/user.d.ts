

export interface BasicUserDetailResponse {
  id: number;
  username: string;
}

export interface LoggedInUser extends BasicUserDetailResponse {
  token: string;
  stripeCustomerId?: string;
  isAccountSetup?: boolean;
}

export interface LoggedInUserSocial extends BasicUserDetailResponse {
  token: string;
  stripeCustomerId?: string;
  isNewUser: boolean;
  isAccountSetup?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneCode: string;
  contact: number;
  isAccountSetup: boolean;
  isMemberSociety: boolean;
  keyfobSerialId: string;
}

export interface RegisterUser {
  id: string,
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  token: string;
  marketing?: boolean;
  isVerified?: boolean;
}

export interface UserEmailVerification extends RegisterUser {
  message: string;
}

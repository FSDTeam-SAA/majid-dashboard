// src/features/auth/types.ts

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  image?: {
    url?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  otp: string;
}

export interface VerifyEmailPayload {
  otp: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
}

export interface AuthTokenResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken?: string;
    user?: User;
  };
}

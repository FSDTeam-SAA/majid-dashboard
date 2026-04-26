// src/features/auth/api/auth.api.ts

import axios from "axios";
import {
  ForgotPasswordPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
  RegisterPayload,
  VerifyEmailPayload,
} from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Register a new user
 */
export async function registerUser(payload: RegisterPayload) {
  const res = await axios.post(`${BASE_URL}/user/register`, payload);
  return res.data;
}

/**
 * Verify email with OTP (requires Bearer token returned from registration)
 */
export async function verifyEmail(
  payload: VerifyEmailPayload,
  accessToken: string,
) {
  const res = await axios.post(`${BASE_URL}/user/verify-email`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

/**
 * Resend email verification OTP (requires Bearer token)
 */
export async function resendEmailOtp(accessToken: string) {
  const res = await axios.post(
    `${BASE_URL}/user/resend-otp`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res.data;
}

/**
 * Step 1: Request OTP for password reset (no auth required)
 * Returns a temporary accessToken needed for subsequent steps.
 */
export async function forgotPassword(payload: ForgotPasswordPayload) {
  const res = await axios.post(`${BASE_URL}/auth/forgot-password`, payload);
  return res.data;
}

/**
 * Step 2: Verify OTP (requires Bearer token from forgotPassword)
 * Returns a new accessToken to use for reset-password.
 */
export async function verifyOtp(
  payload: VerifyOtpPayload,
  accessToken: string,
) {
  const res = await axios.post(`${BASE_URL}/auth/verify-otp`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

/**
 * Step 2b: Resend OTP (requires Bearer token from forgotPassword)
 */
export async function resendForgotOtp(accessToken: string) {
  const res = await axios.post(
    `${BASE_URL}/auth/resend-forgot-otp`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res.data;
}

/**
 * Step 3: Reset password (requires Bearer token from verifyOtp)
 */
export async function resetPassword(
  payload: ResetPasswordPayload,
  accessToken: string,
) {
  const res = await axios.post(`${BASE_URL}/auth/reset-password`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
}

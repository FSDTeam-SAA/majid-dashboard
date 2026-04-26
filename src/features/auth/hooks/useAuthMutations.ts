// src/features/auth/hooks/useForgotPassword.ts

import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  verifyOtp,
  resendForgotOtp,
  resetPassword,
  registerUser,
  verifyEmail,
  resendEmailOtp,
} from "../api/auth.api";
import {
  ForgotPasswordPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
  RegisterPayload,
  VerifyEmailPayload,
} from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}

export function useVerifyEmail(accessToken: string) {
  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) =>
      verifyEmail(payload, accessToken),
  });
}

export function useResendEmailOtp(accessToken: string) {
  return useMutation({
    mutationFn: () => resendEmailOtp(accessToken),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
}

export function useVerifyOtp(accessToken: string) {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload, accessToken),
  });
}

export function useResendForgotOtp(accessToken: string) {
  return useMutation({
    mutationFn: () => resendForgotOtp(accessToken),
  });
}

export function useResetPassword(accessToken: string) {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      resetPassword(payload, accessToken),
  });
}

"use client";

// src/features/auth/components/VerifyOtpForm.tsx

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useVerifyOtp, useResendForgotOtp } from "../hooks/useAuthMutations";

const OTP_LENGTH = 6;

export default function VerifyOtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [accessToken] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("fp_token") || "";
    }
    return "";
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyOtpMutate, isPending: isVerifying } =
    useVerifyOtp(accessToken);
  const { mutate: resendOtpMutate, isPending: isResending } =
    useResendForgotOtp(accessToken);

  useEffect(() => {
    if (!accessToken) {
      toast.error("Session expired. Please start over.");
      router.push("/forgot-password");
      return;
    }
    // Focus first input
    inputRefs.current[0]?.focus();
  }, [router, accessToken]);

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // Auto advance
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    // Focus last filled or next
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < OTP_LENGTH) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    verifyOtpMutate(
      { otp: otpString },
      {
        onSuccess: (data) => {
          const newToken = data?.data?.accessToken;
          if (newToken) {
            // Replace with the reset-password token
            sessionStorage.setItem("rp_token", newToken);
            sessionStorage.removeItem("fp_token");
            toast.success("OTP verified successfully");
            router.push("/forgot-password/reset-password");
          } else {
            toast.error("Verification failed. Please try again.");
          }
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(
            err?.response?.data?.message || "Invalid OTP. Please try again.",
          );
        },
      },
    );
  };

  const handleResend = () => {
    resendOtpMutate(undefined, {
      onSuccess: () => {
        toast.success("OTP resent successfully");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      },
      onError: (error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err?.response?.data?.message || "Failed to resend OTP");
      },
    });
  };

  return (
    <div className="auth-card">
      {/* Logo */}
      <div className="auth-logo">
        <span className="auth-logo-text">imoscan</span>
        <span className="auth-logo-badge">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#3B9EE8" />
            <path
              d="M6.5 11.2L9.5 14.2L15.5 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h1 className="auth-title">Verify Email</h1>
      <p className="auth-subtitle">Enter your email to recover your password</p>

      <form onSubmit={handleVerify} className="auth-form">
        {/* OTP Input boxes */}
        <div className="otp-row" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otp-input${digit ? " otp-input--filled" : ""}`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        <button
          id="otp-verify-submit"
          type="submit"
          className="auth-btn"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </form>

      <button
        id="otp-resend"
        type="button"
        className="auth-resend-btn"
        onClick={handleResend}
        disabled={isResending}
      >
        {isResending ? "Resending..." : "Resend OTP"}
      </button>
    </div>
  );
}

import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  street: z.string().optional(),
  location: z.string().optional(),
  postalCode: z.string().optional(),
  dateOfBirth: z.string().optional(),
  image: z.any().optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordValues = z.infer<typeof passwordSchema>;

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  street?: string;
  location?: string;
  postalCode?: string;
  dateOfBirth?: string;
  image?: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: UserProfile;
}

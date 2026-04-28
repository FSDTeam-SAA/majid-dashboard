"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Camera, User, Lock, ShieldCheck } from "lucide-react";
import {
  useMyProfile,
  useUpdateProfile,
  useChangePassword,
} from "../hooks/useUsers";
import { toast } from "sonner";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  image: z.any().optional(),
});

const passwordSchema = z
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

export function SettingsForm() {
  const { data: profileData, isLoading } = useMyProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [userSelectedPreview, setUserSelectedPreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagePreview =
    userSelectedPreview || profileData?.data?.image?.url || null;

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      profileForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [profileData, profileForm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserSelectedPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      }

      await updateProfileMutation.mutateAsync(formData);
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const user = profileData?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 p-6"
    >
      {/* Header with Avatar */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={imagePreview || undefined} />
              <AvatarFallback className="bg-primary text-white text-3xl">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg">
            <Camera className="w-5 h-5" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {user?.role || "Admin"}
            </span>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Verified Account
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10 h-14 p-1.5 bg-muted/50 rounded-2xl">
          <TabsTrigger
            value="profile"
            className="rounded-xl gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-xl gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="profile" key="profile">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-none shadow-sm rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between px-8 pt-8">
                  <CardTitle className="text-xl font-bold">
                    Personal Information
                  </CardTitle>
                  {!isEditingProfile && (
                    <Button
                      variant="ghost"
                      className="text-primary font-bold gap-2 hover:bg-primary/5"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Details
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="p-8">
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          First Name
                        </label>
                        <Input
                          {...profileForm.register("firstName")}
                          disabled={!isEditingProfile}
                          className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Last Name
                        </label>
                        <Input
                          {...profileForm.register("lastName")}
                          disabled={!isEditingProfile}
                          className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Email Address
                        </label>
                        <Input
                          {...profileForm.register("email")}
                          disabled={!isEditingProfile}
                          className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Phone
                        </label>
                        <Input
                          {...profileForm.register("phone")}
                          disabled={!isEditingProfile}
                          className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                        />
                        {profileForm.formState.errors.phone && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {isEditingProfile && (
                      <div className="flex gap-3 justify-end mt-10">
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-xl font-bold px-8 h-12"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={updateProfileMutation.isPending}
                          className="bg-primary hover:bg-primary/90 text-white rounded-xl px-10 h-12 font-bold shadow-lg shadow-primary/20"
                        >
                          {updateProfileMutation.isPending
                            ? "Updating..."
                            : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" key="security">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-none shadow-sm rounded-3xl">
                <CardHeader className="px-8 pt-8">
                  <CardTitle className="text-xl font-bold">
                    Update Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="space-y-2 max-w-md">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          {...passwordForm.register("currentPassword")}
                          className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                        />
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-xs text-destructive">
                            {
                              passwordForm.formState.errors.currentPassword
                                .message
                            }
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            New Password
                          </label>
                          <Input
                            type="password"
                            {...passwordForm.register("newPassword")}
                            className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                          />
                          {passwordForm.formState.errors.newPassword && (
                            <p className="text-xs text-destructive">
                              {
                                passwordForm.formState.errors.newPassword
                                  .message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Confirm New Password
                          </label>
                          <Input
                            type="password"
                            {...passwordForm.register("confirmPassword")}
                            className="bg-muted/30 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                          />
                          {passwordForm.formState.errors.confirmPassword && (
                            <p className="text-xs text-destructive">
                              {
                                passwordForm.formState.errors.confirmPassword
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={changePasswordMutation.isPending}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-primary/20"
                      >
                        {changePasswordMutation.isPending
                          ? "Updating..."
                          : "Reset Password"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}

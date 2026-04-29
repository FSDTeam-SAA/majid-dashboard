"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  profileSchema,
  passwordSchema,
  ProfileValues,
  PasswordValues,
} from "../types";

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

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      location: "",
      postalCode: "",
      dateOfBirth: "",
    },
  });

  const passwordForm = useForm<PasswordValues>({
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
        street: user.street || "",
        location: user.location || "",
        postalCode: user.postalCode || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
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

  const onProfileSubmit = async (values: ProfileValues) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (values.street) formData.append("street", values.street);
      if (values.location) formData.append("location", values.location);
      if (values.postalCode) formData.append("postalCode", values.postalCode);
      if (values.dateOfBirth)
        formData.append("dateOfBirth", values.dateOfBirth);

      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      }

      await updateProfileMutation.mutateAsync(formData);
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const onPasswordSubmit = async (values: PasswordValues) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch (error: unknown) {
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
          onClick={() => isEditingProfile && fileInputRef.current?.click()}
        >
          <motion.div
            whileHover={isEditingProfile ? { scale: 1.05 } : {}}
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
          {isEditingProfile && (
            <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg">
              <Camera className="w-5 h-5" />
            </div>
          )}
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
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 bg-muted/10 pb-6 border-b border-border/50">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">
                      Personal Information
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Manage your public profile and contact details.
                    </p>
                  </div>
                  {!isEditingProfile && (
                    <Button
                      variant="ghost"
                      className="text-primary font-bold gap-2 hover:bg-primary/5 h-11 px-6 rounded-xl"
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
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          First Name
                        </label>
                        <Input
                          {...profileForm.register("firstName")}
                          disabled={!isEditingProfile}
                          placeholder="Sajjad"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Last Name
                        </label>
                        <Input
                          {...profileForm.register("lastName")}
                          disabled={!isEditingProfile}
                          placeholder="Hossain"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Email Address
                        </label>
                        <Input
                          {...profileForm.register("email")}
                          disabled={true}
                          placeholder="sajjad@example.com"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-50"
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Phone Number
                        </label>
                        <Input
                          {...profileForm.register("phone")}
                          disabled={!isEditingProfile}
                          placeholder="1234567890"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                        {profileForm.formState.errors.phone && (
                          <p className="text-xs text-destructive">
                            {profileForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Street / Address
                        </label>
                        <Input
                          {...profileForm.register("street")}
                          disabled={!isEditingProfile}
                          placeholder="321 Bogura, Bali"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Location / City
                        </label>
                        <Input
                          {...profileForm.register("location")}
                          disabled={!isEditingProfile}
                          placeholder="Bali"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Postal Code
                        </label>
                        <Input
                          {...profileForm.register("postalCode")}
                          disabled={!isEditingProfile}
                          placeholder="34567"
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          {...profileForm.register("dateOfBirth")}
                          disabled={!isEditingProfile}
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20 disabled:opacity-100 disabled:bg-muted/30"
                        />
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex gap-4 justify-end mt-12 pt-8 border-t border-border/50">
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-xl font-bold px-8 h-12 hover:bg-muted"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={updateProfileMutation.isPending}
                          className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-12 font-bold shadow-lg shadow-primary/20"
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
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="px-8 pt-8 bg-muted/10 pb-6 border-b border-border/50">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">
                      Update Password
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Keep your account secure with a strong password.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-10"
                  >
                    <div className="space-y-8">
                      <div className="space-y-3 max-w-md">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          {...passwordForm.register("currentPassword")}
                          className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                          placeholder="••••••••"
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                            New Password
                          </label>
                          <Input
                            type="password"
                            {...passwordForm.register("newPassword")}
                            className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                            placeholder="••••••••"
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
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-foreground uppercase tracking-widest">
                            Confirm New Password
                          </label>
                          <Input
                            type="password"
                            {...passwordForm.register("confirmPassword")}
                            className="bg-muted/50 h-12 border-none rounded-xl focus-visible:ring-primary/20"
                            placeholder="••••••••"
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
                    <div className="flex justify-end pt-8 border-t border-border/50">
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

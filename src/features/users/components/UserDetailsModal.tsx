"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smartphone, DollarSign, Calendar, Mail } from "lucide-react";
import { User } from "./UsersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserAdmin } from "../hooks/useUsers";
import { toast } from "sonner";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Partial<User> | null;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  userData,
}: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(userData?.balance?.toString() || "0");
  const [prevUserId, setPrevUserId] = useState(userData?.id);
  const { mutateAsync: updateUser, isPending } = useUpdateUserAdmin();

  if (userData?.id !== prevUserId) {
    setEmail(userData?.email || "");
    setBalance(userData?.balance?.toString() || "0");
    setPassword("");
    setIsEditing(false);
    setPrevUserId(userData?.id);
  }

  if (!userData) return null;

  const handleSave = async () => {
    try {
      const payload: Record<string, string | number> = {
        email,
        balance: Number(balance),
      };
      if (password) {
        payload.password = password;
      }
      await updateUser({ userId: userData.id!, data: payload });
      toast.success("User updated successfully");
      setIsEditing(false);
      onClose();
    } catch {
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8 border-none shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center pb-6">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {userData.contract}
          </p>
        </div>

        {!isEditing ? (
          <>
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Smartphone className="w-4 h-4" />
                  Device Name
                </div>
                <span className="font-medium text-foreground">
                  {userData.deviceName}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  Balance
                </div>
                <span className="font-medium text-foreground">
                  ${userData.balance}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
                <span className="font-medium text-foreground">
                  {userData.email}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Date Joined
                </div>
                <span className="font-medium text-foreground">
                  {userData.date}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <Button className="w-full" onClick={() => setIsEditing(true)}>
                Edit User Details
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>New Password (Optional)</Label>
              <Input
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Balance ($)</Label>
              <Input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditing(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

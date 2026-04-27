"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smartphone, DollarSign, Calendar, Phone } from "lucide-react";
import { User } from "./UsersTable";

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
  if (!userData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-8 border-none shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center pb-6">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback>{userData.name?.[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Last active 2 hrs ago
          </p>
        </div>

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
              Price
            </div>
            <span className="font-medium text-foreground">
              {userData.price}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Date
            </div>
            <span className="font-medium text-foreground">{userData.date}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              Contact
            </div>
            <span className="font-medium text-foreground">
              {userData.contract}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

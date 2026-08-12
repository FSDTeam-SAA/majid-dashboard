import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getMyProfile,
  updateProfile,
  changePassword,
  updateUserAdmin,
} from "../api/users.api";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}

export function useUpdateUserAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

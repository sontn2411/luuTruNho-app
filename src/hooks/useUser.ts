"use client";

import { useUserStore } from "@/stores/useUserStore";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const refetch = useUserStore((state) => state.fetchUser);

  return {
    user,
    profile,
    userId,
    email,
    isAdmin,
    isLoading,
    error,
    refetch,
  };
}

"use client";

import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";

export function AdminBadge() {
  const profile = useUserStore((state) => state.profile);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const isLoading = useUserStore((state) => state.isLoading);

  // Kiểm tra quyền Admin dựa trên state profile (hoặc isAdmin tổng hợp)
  const showAdmin = profile?.is_admin === true || isAdmin;

  if (isLoading || !showAdmin) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      <span>Admin</span>
    </Link>
  );
}

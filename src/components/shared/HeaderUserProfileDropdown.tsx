"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useLoading } from "@/providers/LoadingProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderUserProfileDropdownProps {
  user: User | null;
}

export const HeaderUserProfileDropdown: React.FC<HeaderUserProfileDropdownProps> = ({
  user,
}) => {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [imgError, setImgError] = useState(false);

  const handleLogout = async () => {
    showLoading("Đang đăng xuất khỏi hệ thống...");
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      hideLoading();
    }
  };

  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative flex items-center gap-2 pl-1.5 pr-3 h-10 rounded-xl bg-card border border-border/60 shadow-xs text-foreground hover:bg-accent/60 transition-all duration-200 outline-none cursor-pointer"
        aria-label="Cài đặt người dùng"
      >
        {/* Avatar Image */}
        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-amber-100/60 border border-border/30 flex items-center justify-center shrink-0">
          {!imgError ? (
            <Image
              src="/assets/images/user-avatar.png"
              alt="Avatar"
              width={28}
              height={28}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <UserIcon className="w-3.5 h-3.5 text-foreground" />
          )}
        </div>

        <span className="text-xs font-semibold text-foreground truncate max-w-[100px]">
          {userDisplayName}
        </span>

        <ChevronDown className="w-3.5 h-3.5 text-foreground/70 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl">
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-xs font-bold text-foreground truncate">
            {userDisplayName}
          </p>
          <p className="text-[11px] font-normal text-muted-foreground truncate mt-0.5">
            {user?.email || "admin@stayflow.com"}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium"
        >
          <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
          <span>Trang cá nhân & Cài đặt</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          variant="destructive"
          className="cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-destructive focus:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserProfileDropdown;

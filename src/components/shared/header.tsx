"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, LogOut, User as UserIcon, Clock, Settings } from "lucide-react";
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

interface HeaderProps {
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [hasUnreadNotif, setHasUnreadNotif] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Cập nhật thời gian thực theo từng giây (Bất đồng bộ để tránh cascading renders)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const timeout = setTimeout(() => {
      setCurrentTime(new Date());
    }, 0);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  // Định dạng hiển thị: "Thứ X, DD/MM/YYYY - HH:mm:ss"
  const formatDateTime = (date: Date | null) => {
    if (!date) return { dateStr: "", timeStr: "" };
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return {
      dateStr: `${dayName}, ${day}/${month}/${year}`,
      timeStr: `${hours}:${minutes}:${seconds}`,
    };
  };

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
    "Nguyễn Văn A";

  const timeData = formatDateTime(currentTime);

  return (
    <header className="sticky top-3 z-40 px-2 md:px-4 w-full transition-all duration-300">
      {/* Floating Island Header Box */}
      <div className="mx-auto max-w-7xl rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-lg shadow-black/5 px-4 py-2.5 flex items-center justify-between gap-4">
        {/* 1. Bên trái: Logo StayFlow & Lời chào & Đồng hồ thời gian thực */}
        <div className="flex items-center gap-3">
          {/* Logo StayFlow */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            title="Trang chủ StayFlow"
          >
            <Image
              src="/assets/images/logo-stay-flow.png"
              alt="StayFlow Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </button>

          <span className="text-border/80">|</span>

          {/* Lời chào User */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="text-muted-foreground">Xin chào,</span>
            <span className="font-bold text-foreground">{userDisplayName}</span>
          </div>

          <span className="text-border/80 hidden sm:inline-block">|</span>

          {/* Đồng hồ thời gian thực với chỉ báo Live Dot */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <Clock className="w-3.5 h-3.5 text-secondary" />

            {timeData.dateStr ? (
              <div className="flex items-center gap-1.5">
                <span>{timeData.dateStr}</span>
                <span>-</span>
                <span className="font-mono text-secondary font-bold">
                  {timeData.timeStr}
                </span>
              </div>
            ) : (
              <span>Đang tải...</span>
            )}
          </div>
        </div>

        {/* 2. Bên phải: Notification Icon & User Profile Dropdown dùng Shadcn UI */}
        <div className="flex items-center gap-2.5">
          {/* Notification Icon với Shadcn DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={() => setHasUnreadNotif(false)}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-foreground hover:bg-accent transition-all duration-200 outline-none cursor-pointer"
              aria-label="Thông báo"
            >
              <Bell className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              {hasUnreadNotif && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-card animate-pulse" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-3 rounded-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-border/60 mb-1">
                <h4 className="text-xs font-bold text-foreground">
                  Thông báo mới
                </h4>
                <span className="text-[10px] text-secondary font-medium cursor-pointer">
                  Đã đọc tất cả
                </span>
              </div>
              <div className="flex flex-col gap-2 py-4 text-xs text-muted-foreground text-center">
                <Bell className="w-6 h-6 mx-auto text-muted-foreground/50 mb-1" />
                <p>Không có thông báo mới nào</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Icon với Shadcn DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 outline-none cursor-pointer"
              aria-label="Cài đặt người dùng"
            >
              <UserIcon className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl">
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
                className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium"
              >
                <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>Trang cá nhân & Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                variant="destructive"
                className="cursor-pointer rounded-xl px-3 py-2 text-xs font-medium text-destructive focus:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

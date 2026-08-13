"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { HeaderLanguageDropdown } from "./HeaderLanguageDropdown";
import { HeaderNotificationDropdown } from "./HeaderNotificationDropdown";
import { HeaderUserProfileDropdown } from "./HeaderUserProfileDropdown";

interface HeaderProps {
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
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

  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const timeData = formatDateTime(currentTime);

  return (
    <header className="mt-4 z-40 px-2 md:px-4 w-full transition-all duration-300">
      {/* Floating Island Header Box */}
      <div className="mx-auto rounded-xl px-4 py-2.5 flex items-center justify-between gap-4">
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

        {/* 2. Bên phải: Notification, Language & User Profile */}
        <div className="flex items-center gap-2.5">
          <HeaderNotificationDropdown />
          <HeaderLanguageDropdown />
          <HeaderUserProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;

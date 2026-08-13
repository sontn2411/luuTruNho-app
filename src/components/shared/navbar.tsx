"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Users,
  ConciergeBell,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { BroomIcon } from "@/components/ui/icons";
import { createClient } from "@/lib/supabase/client";
import { useLoading } from "@/providers/LoadingProvider";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Tổng quan", href: "/dashboard", icon: LayoutDashboard },
  { name: "Đặt phòng", href: "/bookings", icon: CalendarCheck },
  { name: "Quản lý phòng", href: "/rooms", icon: BedDouble },
  { name: "Khách hàng", href: "/guests", icon: Users },
  { name: "Dọn phòng", href: "/housekeeping", icon: BroomIcon },
  { name: "Dịch vụ", href: "/services", icon: ConciergeBell },
  { name: "Tài chính", href: "/finance", icon: Wallet },
  { name: "Báo cáo", href: "/reports", icon: BarChart3 },
  { name: "Cài đặt", href: "/settings", icon: Settings },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();

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

  const activeIndex = navItems.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5 p-3 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 backdrop-blur-md transition-all duration-300"
    >
      {/* Nav List Container */}
      <div className="relative flex flex-col gap-2 pt-0.5">
        {/* Sliding Active Pill Indicator */}
        {activeIndex !== -1 && (
          <div
            className="absolute left-0 top-0.5 w-12 h-12 rounded-xl bg-card shadow-lg shadow-black/15 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-0"
            style={{
              transform: `translateY(${activeIndex * 56}px)`,
            }}
          >
            {/* Vạch chỉ báo nhỏ trượt cùng ở lề trái */}
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-card rounded-r-full shadow-md transition-all duration-300" />
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative z-10 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-primary-foreground/75 hover:bg-primary-foreground/15 hover:text-primary-foreground hover:scale-105"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? "scale-105 text-primary" : "group-hover:scale-110"
                }`}
              />

              {/* Tooltip text */}
              <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-lg z-50">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="w-9 h-[1px] bg-primary-foreground/20 my-1" />

      {/* Prominent Red Logout Button at bottom */}
      <div className="flex items-center justify-center pb-0.5">
        <button
          onClick={handleLogout}
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl text-destructive-foreground hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-destructive/30 cursor-pointer"
          aria-label="Đăng xuất"
        >
          <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

          {/* Tooltip text */}
          <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium whitespace-nowrap opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-lg z-50">
            Đăng xuất
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

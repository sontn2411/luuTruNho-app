"use client";

import React from "react";
import {
  Building2,
  BedDouble,
  CreditCard,
  Bell,
  ShieldCheck,
  Database,
  LucideIcon,
  ChevronRight,
} from "lucide-react";
import { SettingsTabId } from "./types";

interface TabConfig {
  id: SettingsTabId;
  label: string;
  description: string;
  icon: LucideIcon;
}

const TABS: TabConfig[] = [
  {
    id: "general",
    label: "Thông tin chung",
    description: "Tên khách sạn, hotline & địa chỉ",
    icon: Building2,
  },
  {
    id: "rooms",
    label: "Cấu hình phòng",
    description: "Tự động đổi trạng thái & phụ thu",
    icon: BedDouble,
  },
  {
    id: "booking",
    label: "Thanh toán & QR",
    description: "Tiền cọc & Tài khoản VietQR",
    icon: CreditCard,
  },
  {
    id: "notifications",
    label: "Thông báo",
    description: "Cảnh báo hệ thống, SMS & Email",
    icon: Bell,
  },
  {
    id: "security",
    label: "Bảo mật & Tài khoản",
    description: "Đổi mật khẩu & Thiết bị đăng nhập",
    icon: ShieldCheck,
  },
  {
    id: "database",
    label: "Cơ sở dữ liệu",
    description: "Kết nối Supabase riêng biệt đơn vị",
    icon: Database,
  },
];

interface SettingsNavTabsProps {
  activeTab: SettingsTabId;
  onTabChange: (tabId: SettingsTabId) => void;
}

export function SettingsNavTabs({
  activeTab,
  onTabChange,
}: SettingsNavTabsProps) {
  return (
    <nav className="flex flex-col gap-1.5 w-full">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-3 pb-2 hidden lg:block">
        Danh mục cài đặt
      </div>

      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5 pb-2 lg:pb-0">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-xs transition-all text-left cursor-pointer shrink-0 border ${
                isActive
                  ? "bg-card text-foreground border-border/80 shadow-xs font-bold"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-card/60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isActive
                      ? "bg-secondary text-primary-foreground border-secondary shadow-2xs"
                      : "bg-accent/50 text-muted-foreground border-border/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col min-w-0 pr-1">
                  <span className="font-bold text-xs truncate">
                    {tab.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-normal truncate hidden sm:inline-block lg:inline-block">
                    {tab.description}
                  </span>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 hidden lg:block shrink-0 transition-transform ${
                  isActive
                    ? "text-foreground translate-x-0.5"
                    : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default SettingsNavTabs;

"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderNotificationDropdown: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => setUnreadCount(0)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border/60 shadow-xs text-foreground hover:bg-accent/60 transition-all duration-200 outline-none cursor-pointer"
        aria-label="Thông báo"
      >
        <Bell className="w-4.5 h-4.5 text-foreground stroke-[1.75]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-[#3b4c3e] text-white text-[10px] font-bold flex items-center justify-center shadow-xs border-2 border-card">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-3 rounded-xl">
        <div className="flex items-center justify-between pb-2 border-b border-border/60 mb-1">
          <h4 className="text-xs font-bold text-foreground">
            Thông báo mới
          </h4>
          <span
            onClick={() => setUnreadCount(0)}
            className="text-[10px] text-secondary font-medium cursor-pointer hover:underline"
          >
            Đã đọc tất cả
          </span>
        </div>
        <div className="flex flex-col gap-2 py-4 text-xs text-muted-foreground text-center">
          <Bell className="w-6 h-6 mx-auto text-muted-foreground/50 mb-1" />
          <p>
            {unreadCount > 0
              ? `Bạn có ${unreadCount} thông báo mới`
              : "Không có thông báo mới nào"}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderNotificationDropdown;

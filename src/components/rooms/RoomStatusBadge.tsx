import React from "react";
import { RoomStatus } from "./types";

interface RoomStatusBadgeProps {
  status: RoomStatus;
  className?: string;
}

export function RoomStatusBadge({ status, className = "" }: RoomStatusBadgeProps) {
  switch (status) {
    case "available":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          Trống
        </span>
      );
    case "occupied":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          Đang ở
        </span>
      );
    case "dirty":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-500/10 text-rose-700 dark:text-rose-400 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          Chưa dọn
        </span>
      );
    case "maintenance":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-500/10 text-slate-700 dark:text-slate-400 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
          Bảo trì
        </span>
      );
  }
}

export default RoomStatusBadge;

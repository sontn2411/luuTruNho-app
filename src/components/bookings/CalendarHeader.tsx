"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";

interface CalendarHeaderProps {
  currentMonthYearStr: string;
  viewMode: "month" | "week";
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  onViewModeChange: (mode: "month" | "week") => void;
  onOpenQuickBooking?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonthYearStr,
  viewMode,
  onToday,
  onPrev,
  onNext,
  onViewModeChange,
  onOpenQuickBooking,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md flex flex-col gap-3 py-3 border-b border-border/40 transition-all">
      <PageHeader
        icon={CalendarIcon}
        title="Lịch xem phòng"
        description="Bảng lưới quản lý danh sách phòng - Tự động nổi bật ngày hiện tại"
        className="md:flex-row md:items-center"
        action={
          <div className="flex flex-wrap items-center gap-2">
            {/* Nút Đặt Phòng Mới Nhanh */}
            <button
              onClick={onOpenQuickBooking}
              className="px-3.5 py-1.5 rounded-xl bg-secondary text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Đặt phòng</span>
            </button>

            {/* Nút Hôm nay */}
            <button
              onClick={onToday}
              className="px-3.5 py-1.5 rounded-xl border border-border/60 bg-card text-xs font-semibold text-foreground hover:bg-accent transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Hôm nay
            </button>

            {/* Nút Trái / Phải */}
            <div className="flex items-center gap-1 bg-card border border-border/60 rounded-xl p-0.5 shadow-xs">
              <button
                onClick={onPrev}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground hover:bg-accent cursor-pointer"
                title="Tuần trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground hover:bg-accent cursor-pointer"
                title="Tuần sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tháng / Năm */}
            <div className="px-3 py-1.5 rounded-xl border border-border/60 bg-card text-xs font-bold text-foreground shadow-xs">
              {currentMonthYearStr}
            </div>

            {/* Chuyển Tháng / Tuần */}
            <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border/40 text-xs font-semibold">
              <button
                onClick={() => onViewModeChange("month")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === "month"
                    ? "bg-[#344837] text-white shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                2 Tuần (Tháng)
              </button>
              <button
                onClick={() => onViewModeChange("week")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === "week"
                    ? "bg-[#344837] text-white shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                1 Tuần
              </button>
            </div>
          </div>
        }
      />

      {/* Chú thích 4 Trạng thái chuẩn */}
      <div className="flex flex-wrap items-center gap-6 text-xs font-semibold pt-1 border-t border-border/20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#445340] shrink-0" />
          <span className="text-foreground/90">Đã xác nhận</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EEBA42] shrink-0" />
          <span className="text-foreground/90">Chờ xác nhận</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#5A6B7C] shrink-0" />
          <span className="text-foreground/90">Đã trả phòng</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#B5ADA4] shrink-0" />
          <span className="text-foreground/90">Bảo trì</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

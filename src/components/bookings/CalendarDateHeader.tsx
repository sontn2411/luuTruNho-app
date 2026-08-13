"use client";

import React from "react";
import { getDayInfo } from "./date-utils";

interface CalendarDateHeaderProps {
  dateList: Date[];
  totalDays: number;
}

export const CalendarDateHeader: React.FC<CalendarDateHeaderProps> = ({
  dateList,
  totalDays,
}) => {
  return (
    <div className="sticky top-0 z-30 flex items-center border-b border-border/60 bg-card text-xs font-bold select-none shadow-xs">
      {/* Cột Tên Phòng (Sticky góc trên bên trái: ghim cả dọc lẫn ngang) */}
      <div className="w-48 md:w-56 px-3 md:px-4 py-3 sticky left-0 top-0 z-40 bg-card border-r border-border/60 text-foreground font-bold flex items-center gap-2">
        <span>Phòng</span>
      </div>

      {/* Danh sách các cột Ngày (Co giãn theo màn hình) */}
      <div
        className="flex-1 grid"
        style={{
          gridTemplateColumns: `repeat(${totalDays}, minmax(0, 1fr))`,
        }}
      >
        {dateList.map((d, idx) => {
          const info = getDayInfo(d);
          return (
            <div
              key={idx}
              className={`py-2 text-center border-r border-border/40 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                info.isTodayDate
                  ? "bg-emerald-500/15 text-emerald-800 font-bold"
                  : info.isSunday
                  ? "bg-red-500/5 text-red-500 font-extrabold"
                  : info.isWeekendDay
                  ? "bg-blue-500/5 text-blue-600 font-bold"
                  : "text-foreground"
              }`}
            >
              {info.isTodayDate && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[8px] md:text-[9px] font-extrabold shadow-xs tracking-wider uppercase truncate max-w-full">
                  Hôm nay
                </span>
              )}
              <span className="text-xs md:text-sm font-bold">{info.dayNum}</span>
              <span
                className={`text-[10px] md:text-[11px] font-semibold ${
                  info.isTodayDate
                    ? "text-emerald-800 font-bold"
                    : info.isSunday
                    ? "text-red-500"
                    : info.isWeekendDay
                    ? "text-blue-500"
                    : "text-muted-foreground"
                }`}
              >
                {info.dayLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDateHeader;

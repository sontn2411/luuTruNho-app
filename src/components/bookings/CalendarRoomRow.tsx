"use client";

import React from "react";
import { Room, Booking } from "./types";
import { isToday } from "./date-utils";
import { CalendarBookingItem } from "./CalendarBookingItem";

interface CalendarRoomRowProps {
  room: Room;
  dateList: Date[];
  totalDays: number;
  bookings: Booking[];
  onBookingClick?: (booking: Booking) => void;
}

export const CalendarRoomRow: React.FC<CalendarRoomRowProps> = ({
  room,
  dateList,
  totalDays,
  bookings,
  onBookingClick,
}) => {
  // Lọc các booking thuộc phòng hiện tại
  const roomBookings = bookings.filter((b) => b.roomId === room.id);

  return (
    <div className="flex items-center border-b border-border/40 hover:bg-accent/30 transition-colors group">
      {/* Cột Tên Phòng (Sticky bên trái khi cuộn ngang) */}
      <div className="w-48 md:w-56 px-3 md:px-4 py-3 sticky left-0 z-20 bg-card border-r border-border/60 group-hover:bg-accent/50 transition-colors flex items-center justify-between gap-2 shadow-xs">
        <div className="flex flex-col min-w-0">
          <span
            className="text-xs md:text-sm font-bold text-foreground truncate"
            title={room.name}
          >
            {room.name}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {room.capacity}
          </span>
        </div>
      </div>

      {/* Cột lưới ngày & Các thanh Booking đè lên */}
      <div className="flex-1 min-h-[60px] relative flex items-center">
        {/* Bảng ô lưới ngày (Background Grid) */}
        <div
          className="w-full grid min-h-[60px] absolute inset-0"
          style={{
            gridTemplateColumns: `repeat(${totalDays}, minmax(0, 1fr))`,
          }}
        >
          {dateList.map((d, idx) => {
            const isTodayCol = isToday(d);
            return (
              <div
                key={idx}
                className={`border-r border-border/30 hover:bg-primary/5 transition-colors cursor-pointer ${
                  isTodayCol ? "bg-emerald-500/5 border-x-emerald-500/20" : ""
                }`}
              />
            );
          })}
        </div>

        {/* Các thanh Booking đè lên ô lưới */}
        {roomBookings.map((b) => (
          <CalendarBookingItem
            key={b.id}
            booking={b}
            dateList={dateList}
            onClick={onBookingClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarRoomRow;

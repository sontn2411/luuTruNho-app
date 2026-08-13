"use client";

import React from "react";
import { Room, Booking } from "./types";
import { CalendarDateHeader } from "./CalendarDateHeader";
import { CalendarRoomRow } from "./CalendarRoomRow";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { CustomVScrollbar } from "./CustomVScrollbar";

interface CalendarGridProps {
  rooms: Room[];
  dateList: Date[];
  totalDays: number;
  bookings: Booking[];
  onBookingClick?: (booking: Booking) => void;
}

const ROOM_ROW_HEIGHT = 61; // Đơn vị px chuẩn của mỗi hàng phòng

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  rooms,
  dateList,
  totalDays,
  bookings,
  onBookingClick,
}) => {
  // Hook cuộn ảo tự viết (useVirtualScroll)
  const { containerRef, virtualItems, topPadding, bottomPadding } =
    useVirtualScroll({
      items: rooms,
      rowHeight: ROOM_ROW_HEIGHT,
      overscan: 5, // Tải trước 5 hàng phòng phía trên và dưới
    });

  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden flex flex-col relative group/grid">
      {/* Khung cuộn duy nhất cho cả Ngang (14 ngày) và Dọc (50 phòng với Virtual Scroll) */}
      <div
        ref={containerRef}
        className="w-full max-h-[calc(100vh-220px)] min-h-[500px] overflow-auto relative scroll-smooth [::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {/* Container quy định chiều rộng tối thiểu khi cuộn ngang */}
        <div className="min-w-[900px] md:min-w-[1200px] flex flex-col">
          {/* 1. Header hiển thị các cột Ngày (Dính top khi cuộn dọc) */}
          <CalendarDateHeader dateList={dateList} totalDays={totalDays} />

          {/* 2. Danh sách các Hàng Phòng được tối ưu bằng Virtual Scroll */}
          <div
            style={{
              paddingTop: `${topPadding}px`,
              paddingBottom: `${bottomPadding}px`,
            }}
          >
            {virtualItems.map((room) => (
              <CalendarRoomRow
                key={room.id}
                room={room}
                dateList={dateList}
                totalDays={totalDays}
                bookings={bookings}
                onBookingClick={onBookingClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Thanh cuộn dọc tùy chỉnh (CustomVScrollbar) ẩn scroll mặc định của trình duyệt */}
      <CustomVScrollbar
        scrollRef={containerRef}
        rooms={rooms}
        dateList={dateList}
        totalDays={totalDays}
      />
    </div>
  );
};

export default CalendarGrid;

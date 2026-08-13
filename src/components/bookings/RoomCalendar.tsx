"use client";

import React, { useState, useMemo } from "react";
import { ROOMS, MOCK_BOOKINGS } from "./mock-data";
import { Booking, BookingStatus } from "./types";
import { getStartOfCurrentWeek, addDays, format } from "./date-utils";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { BookingDetailModal } from "./BookingDetailModal";
import { QuickBookingModal } from "./QuickBookingModal";
import { TooltipProvider } from "@/components/ui/tooltip";

export function RoomCalendar() {
  // Quản lý danh sách booking động (để có thể đổi status, tạo đơn mới hoặc xóa đơn)
  const [bookingsList, setBookingsList] = useState<Booking[]>(MOCK_BOOKINGS);

  // State booking đang được chọn để xem/sửa trong Modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // State mở Modal Đặt Phòng Nhanh
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);

  // Mốc ngày bắt đầu: Luôn lấy từ Thứ 2 của tuần hiện tại (weekStartsOn: 1)
  const [startDate, setStartDate] = useState<Date>(() =>
    getStartOfCurrentWeek()
  );

  // Chế độ xem: "month" (14 ngày / 2 tuần) hoặc "week" (7 ngày / 1 tuần)
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  // Số lượng ngày hiển thị
  const totalDays = viewMode === "month" ? 14 : 7;

  // Tạo danh sách các ngày sẽ hiển thị trên lịch từ Thứ 2
  const dateList = useMemo(() => {
    const list: Date[] = [];
    for (let i = 0; i < totalDays; i++) {
      list.push(addDays(startDate, i));
    }
    return list;
  }, [startDate, totalDays]);

  // Chuỗi hiển thị Tháng, Năm trên Header (ví dụ: "Tháng 8, 2026")
  const currentMonthYearStr = useMemo(() => {
    const midDate = dateList[Math.floor(dateList.length / 2)] || startDate;
    return `Tháng ${format(midDate, "M, yyyy")}`;
  }, [dateList, startDate]);

  // Thao tác chuyển ngày (tính theo khoảng tuần)
  const handlePrev = () =>
    setStartDate((prev) => addDays(prev, viewMode === "month" ? -14 : -7));
  const handleNext = () =>
    setStartDate((prev) => addDays(prev, viewMode === "month" ? 14 : 7));
  const handleToday = () => setStartDate(getStartOfCurrentWeek());

  // Thao tác khi click vào một booking
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  // Thao tác đổi nhanh trạng thái booking từ Modal
  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    // Cập nhật lại booking đang chọn
    setSelectedBooking((prev) =>
      prev && prev.id === bookingId ? { ...prev, status: newStatus } : prev
    );
  };

  // Thao tác hủy/xóa booking
  const handleDeleteBooking = (bookingId: string) => {
    setBookingsList((prev) => prev.filter((b) => b.id !== bookingId));
    setSelectedBooking(null);
  };

  // Thao tác thêm booking mới từ Modal Đặt Phòng Nhanh
  const handleAddBooking = (newBooking: Booking) => {
    setBookingsList((prev) => [newBooking, ...prev]);
  };

  return (
    <TooltipProvider delayDuration={150} disableHoverableContent>
      <div className="w-full flex flex-col gap-4 py-4 md:py-6">
        {/* 1. Header Điều Khiển Lịch */}
        <CalendarHeader
          currentMonthYearStr={currentMonthYearStr}
          viewMode={viewMode}
          onToday={handleToday}
          onPrev={handlePrev}
          onNext={handleNext}
          onViewModeChange={(mode) => setViewMode(mode)}
          onOpenQuickBooking={() => setIsQuickBookingOpen(true)}
        />

        {/* 2. Khung Bảng Lưới Lịch (Nhúng MOCK_BOOKINGS & Xử lý Click) */}
        <CalendarGrid
          rooms={ROOMS}
          dateList={dateList}
          totalDays={totalDays}
          bookings={bookingsList}
          onBookingClick={handleBookingClick}
        />

        {/* 3. Modal Chi Tiết Booking khi người dùng click vào */}
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
          onDeleteBooking={handleDeleteBooking}
        />

        {/* 4. Modal Đặt Phòng Nhanh */}
        <QuickBookingModal
          isOpen={isQuickBookingOpen}
          onClose={() => setIsQuickBookingOpen(false)}
          rooms={ROOMS}
          onAddBooking={handleAddBooking}
        />
      </div>
    </TooltipProvider>
  );
}

export default RoomCalendar;

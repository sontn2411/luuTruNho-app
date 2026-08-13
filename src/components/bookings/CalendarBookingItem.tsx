"use client";

import React from "react";
import { Booking } from "./types";
import {
  differenceInCalendarDays,
  parseISO,
  isBefore,
  isAfter,
  isValid,
  getHours,
  getMinutes,
} from "date-fns";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { BookingTooltipContent } from "./BookingTooltipContent";

interface CalendarBookingItemProps {
  booking: Booking;
  dateList: Date[];
  onClick?: (booking: Booking) => void;
}

/**
 * Tính phần ô lẻ của ngày dựa vào mốc 12h trưa (0.5)
 * Trước 12h: < 0.5 (nằm nửa đầu ô ngày)
 * Sau 12h: > 0.5 (nằm nửa sau ô ngày)
 */
function getDayFraction(dateTimeStr: string, defaultHour: number): number {
  if (!dateTimeStr) return defaultHour / 24;

  if (dateTimeStr.length === 10) {
    return defaultHour / 24;
  }

  try {
    const formattedStr = dateTimeStr.includes(" ")
      ? dateTimeStr.replace(" ", "T")
      : dateTimeStr;
    const d = parseISO(formattedStr);
    if (!isValid(d)) return defaultHour / 24;

    const hours = getHours(d);
    const minutes = getMinutes(d);
    const totalHours = hours + minutes / 60;

    return totalHours / 24;
  } catch {
    return defaultHour / 24;
  }
}

export const CalendarBookingItem: React.FC<CalendarBookingItemProps> = ({
  booking,
  dateList,
  onClick,
}) => {
  if (!dateList || dateList.length === 0) return null;

  const startDate = dateList[0];
  const endDate = dateList[dateList.length - 1];

  const checkInStr = booking.checkIn.includes(" ")
    ? booking.checkIn.replace(" ", "T")
    : booking.checkIn;
  const checkOutStr = booking.checkOut.includes(" ")
    ? booking.checkOut.replace(" ", "T")
    : booking.checkOut;

  const checkInDate = parseISO(checkInStr);
  const checkOutDate = parseISO(checkOutStr);

  // Kiểm tra nếu booking nằm ngoài phạm vi hiển thị
  if (isBefore(checkOutDate, startDate) || isAfter(checkInDate, endDate)) {
    return null;
  }

  const totalDays = dateList.length;

  const startDayDiff = differenceInCalendarDays(checkInDate, startDate);
  const endDayDiff = differenceInCalendarDays(checkOutDate, startDate);

  const checkInFrac = getDayFraction(booking.checkIn, 14);
  const checkOutFrac = getDayFraction(booking.checkOut, 12);

  const exactStartDay = startDayDiff + checkInFrac;
  const exactEndDay = endDayDiff + checkOutFrac;

  const clampedStartDay = Math.max(0, exactStartDay);
  const clampedEndDay = Math.min(totalDays, exactEndDay);
  const spanDays = clampedEndDay - clampedStartDay;

  if (spanDays <= 0) return null;

  const leftPercent = (clampedStartDay / totalDays) * 100;
  const widthPercent = (spanDays / totalDays) * 100;

  // 4 Trạng thái với 4 màu sắc chuẩn theo mockup
  const statusStyles = {
    confirmed:
      "bg-[#445340] hover:bg-[#344837] text-white border-l-4 border-l-[#273525] shadow-xs",
    pending:
      "bg-[#EEBA42] hover:bg-[#E0AC34] text-[#3D3008] font-bold border-l-4 border-l-[#C49219] shadow-xs",
    checked_out:
      "bg-[#5A6B7C] hover:bg-[#4A5969] text-white border-l-4 border-l-[#36424E] shadow-xs",
    maintenance:
      "bg-[#B5ADA4] hover:bg-[#A39B92] text-[#2C2723] font-bold border-l-4 border-l-[#8C847B] shadow-xs",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() => onClick?.(booking)}
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
          }}
          className={`absolute top-1.5 bottom-1.5 z-10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 overflow-hidden transition-all duration-150 cursor-pointer active:scale-[0.99] ${
            statusStyles[booking.status] || statusStyles.confirmed
          }`}
        >
          <span className="text-xs font-bold truncate select-none">
            {booking.guestName}
          </span>
        </div>
      </TooltipTrigger>

      {/* TOOLTIP CONTENT TÁCH THÀNH COMPONENT RIÊNG */}
      <BookingTooltipContent booking={booking} />
    </Tooltip>
  );
};

export default CalendarBookingItem;

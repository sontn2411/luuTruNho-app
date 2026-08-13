"use client";

import React from "react";
import { Booking } from "./types";
import { parseISO, isValid, format } from "date-fns";
import {
  Phone,
  DollarSign,
  FileText,
  Wrench,
  CheckCircle2,
  Clock,
  LogOut,
} from "lucide-react";
import { TooltipContent } from "@/components/ui/tooltip";

interface BookingTooltipContentProps {
  booking: Booking;
}

/** Format giờ hh:mm */
function formatTime(dateTimeStr: string): string {
  if (!dateTimeStr) return "";
  try {
    const formattedStr = dateTimeStr.includes(" ")
      ? dateTimeStr.replace(" ", "T")
      : dateTimeStr;
    const d = parseISO(formattedStr);
    if (!isValid(d)) return dateTimeStr;
    return format(d, "HH:mm");
  } catch {
    return dateTimeStr;
  }
}

/** Format ngày dd/MM/yyyy */
function formatDate(dateTimeStr: string): string {
  if (!dateTimeStr) return "";
  try {
    const formattedStr = dateTimeStr.includes(" ")
      ? dateTimeStr.replace(" ", "T")
      : dateTimeStr;
    const d = parseISO(formattedStr);
    if (!isValid(d)) return dateTimeStr;
    return format(d, "dd/MM/yyyy");
  } catch {
    return dateTimeStr;
  }
}

/** Format tiền VND */
function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export const BookingTooltipContent: React.FC<BookingTooltipContentProps> = ({
  booking,
}) => {
  const isMaintenance = booking.status === "maintenance";

  // Cấu hình màu sắc, viền accent & Icon cho 4 trạng thái
  const statusConfigs = {
    confirmed: {
      label: "Đã xác nhận",
      bgBadge: "bg-[#445340]/15 text-[#445340] border-[#445340]/30",
      accentBorder: "border-t-[#445340]",
      icon: CheckCircle2,
    },
    pending: {
      label: "Chờ xác nhận",
      bgBadge: "bg-[#EEBA42]/15 text-[#B88714] border-[#EEBA42]/30",
      accentBorder: "border-t-[#EEBA42]",
      icon: Clock,
    },
    checked_out: {
      label: "Đã trả phòng",
      bgBadge: "bg-[#5A6B7C]/15 text-[#3D4C5C] border-[#5A6B7C]/30",
      accentBorder: "border-t-[#5A6B7C]",
      icon: LogOut,
    },
    maintenance: {
      label: "Bảo trì",
      bgBadge: "bg-[#B5ADA4]/20 text-[#5C544C] border-[#B5ADA4]/30",
      accentBorder: "border-t-[#B5ADA4]",
      icon: Wrench,
    },
  };

  const currentStatus =
    statusConfigs[booking.status] || statusConfigs.confirmed;
  const StatusIcon = currentStatus.icon;

  // Tính phần trăm tiền đã cọc
  const paidPercent =
    booking.totalAmount && booking.totalAmount > 0
      ? Math.min(
          100,
          Math.round(((booking.paidAmount || 0) / booking.totalAmount) * 100)
        )
      : 0;

  return (
    <TooltipContent
      side="top"
      align="center"
      sideOffset={10}
      className={`w-72 p-0 bg-card/98 backdrop-blur-md border border-border/70 rounded-2xl shadow-2xl text-foreground pointer-events-none select-none overflow-hidden border-t-4 ${currentStatus.accentBorder} font-sans`}
    >
      <div className="p-3.5 space-y-3">
        {/* 1. Header: Tên khách hàng & Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
              {isMaintenance ? "Lịch bảo trì" : "Thông tin đặt phòng"}
            </span>
            <h4 className="text-sm font-bold text-foreground truncate tracking-tight">
              {booking.guestName}
            </h4>
          </div>
          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border flex items-center gap-1 shrink-0 ${currentStatus.bgBadge}`}
          >
            <StatusIcon className="w-3 h-3 shrink-0" />
            <span>{currentStatus.label}</span>
          </div>
        </div>

        {/* 2. Khung thời gian Check-in -> Check-out (Grid 2 cột) */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-muted/50 border border-border/40 text-xs">
          {/* Nhận phòng */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Check-in
            </span>
            <span className="font-bold text-foreground">
              {formatTime(booking.checkIn)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {formatDate(booking.checkIn)}
            </span>
          </div>

          {/* Trả phòng */}
          <div className="flex flex-col gap-0.5 border-l border-border/40 pl-2.5">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Check-out
            </span>
            <span className="font-bold text-foreground">
              {formatTime(booking.checkOut)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {formatDate(booking.checkOut)}
            </span>
          </div>
        </div>

        {/* 3. Số điện thoại & Thanh Tiến độ Thanh toán */}
        <div className="space-y-2 text-xs pt-0.5">
          {booking.guestPhone && (
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                SĐT liên hệ:
              </span>
              <span className="font-semibold text-foreground">
                {booking.guestPhone}
              </span>
            </div>
          )}

          {booking.totalAmount !== undefined && booking.totalAmount > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  Đã cọc ({paidPercent}%):
                </span>
                <span className="font-bold text-foreground">
                  {formatVND(booking.paidAmount || 0)} /{" "}
                  {formatVND(booking.totalAmount)}
                </span>
              </div>
              {/* Progress bar tỉ lệ tiền đã cọc */}
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  style={{ width: `${paidPercent}%` }}
                  className={`h-full transition-all rounded-full ${
                    paidPercent >= 100
                      ? "bg-[#445340]"
                      : paidPercent > 0
                      ? "bg-[#EEBA42]"
                      : "bg-muted"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Ghi chú */}
          {booking.note && (
            <div className="flex items-start gap-1.5 text-[11px] p-2 rounded-lg bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="leading-tight italic">{booking.note}</span>
            </div>
          )}
        </div>
      </div>
    </TooltipContent>
  );
};

export default BookingTooltipContent;

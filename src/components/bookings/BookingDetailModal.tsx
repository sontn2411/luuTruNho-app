"use client";

import React, { useState } from "react";
import { Booking, BookingStatus } from "./types";
import { parseISO, isValid, format, differenceInCalendarDays } from "date-fns";
import {
  Phone,
  Calendar,
  DollarSign,
  FileText,
  Wrench,
  CheckCircle2,
  Clock,
  LogOut,
  User,
  BedDouble,
  Trash2,
  ArrowRight,
  Check,
  AlertTriangle,
  HardHat,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BookingDetailModalProps {
  booking: Booking | null;
  onClose: () => void;
  onStatusChange?: (bookingId: string, newStatus: BookingStatus) => void;
  onDeleteBooking?: (bookingId: string) => void;
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

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  onClose,
  onStatusChange,
  onDeleteBooking,
}) => {
  const [prevBookingId, setPrevBookingId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<BookingStatus>("confirmed");

  // Đồng bộ draftStatus theo booking mới mà KHÔNG DÙNG useEffect (Chuẩn React 19)
  if (booking && booking.id !== prevBookingId) {
    setPrevBookingId(booking.id);
    setDraftStatus(booking.status);
  }

  if (!booking) return null;

  // Kiểm tra loại phiếu gốc: Nếu là Bảo trì kỹ thuật
  const isMaintenanceWorkItem = booking.status === "maintenance";

  // Cấu hình 4 trạng thái
  const statusConfigs = {
    confirmed: {
      label: "Đã xác nhận",
      bgBadge: "bg-[#445340]/15 text-[#445340] border-[#445340]/30",
      borderTop: "border-t-[#445340]",
      icon: CheckCircle2,
    },
    pending: {
      label: "Chờ xác nhận",
      bgBadge: "bg-[#EEBA42]/15 text-[#B88714] border-[#EEBA42]/30",
      borderTop: "border-t-[#EEBA42]",
      icon: Clock,
    },
    checked_out: {
      label: "Đã trả phòng",
      bgBadge: "bg-[#5A6B7C]/15 text-[#3D4C5C] border-[#5A6B7C]/30",
      borderTop: "border-t-[#5A6B7C]",
      icon: LogOut,
    },
    maintenance: {
      label: "Bảo trì",
      bgBadge: "bg-[#B5ADA4]/20 text-[#5C544C] border-[#B5ADA4]/30",
      borderTop: "border-t-[#B5ADA4]",
      icon: Wrench,
    },
  };

  const currentStatus =
    statusConfigs[draftStatus] || statusConfigs.confirmed;

  // Tính số đêm lưu trú
  const checkInD = parseISO(
    booking.checkIn.includes(" ")
      ? booking.checkIn.replace(" ", "T")
      : booking.checkIn
  );
  const checkOutD = parseISO(
    booking.checkOut.includes(" ")
      ? booking.checkOut.replace(" ", "T")
      : booking.checkOut
  );
  const nightCount = Math.max(1, differenceInCalendarDays(checkOutD, checkInD));

  // Tỉ lệ thanh toán
  const paidPercent =
    booking.totalAmount && booking.totalAmount > 0
      ? Math.min(
          100,
          Math.round(((booking.paidAmount || 0) / booking.totalAmount) * 100)
        )
      : 0;

  const remainingAmount = Math.max(
    0,
    (booking.totalAmount || 0) - (booking.paidAmount || 0)
  );

  // Xử lý khi bấm nút "Hoàn tất": Thực hiện cập nhật trạng thái mới
  const handleSave = () => {
    if (booking && draftStatus !== booking.status) {
      onStatusChange?.(booking.id, draftStatus);
    }
    onClose();
  };

  return (
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`sm:max-w-xl md:max-w-2xl border-t-4 ${currentStatus.borderTop}`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              {isMaintenanceWorkItem ? (
                <Wrench className="w-5 h-5 text-[#5C544C]" />
              ) : (
                <BedDouble className="w-5 h-5 text-primary" />
              )}
            </div>
            <DialogHeader>
              <DialogDescription className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isMaintenanceWorkItem
                  ? `Phiếu Bảo Trì Kỹ Thuật · Mã #${booking.id}`
                  : `Mã đơn: #${booking.id} · Phòng ${booking.roomId}`}
              </DialogDescription>
              <DialogTitle className="text-base font-bold text-foreground tracking-tight">
                {isMaintenanceWorkItem
                  ? `Bảo Trì Phòng ${booking.roomId}`
                  : booking.guestName}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 space-y-5">
          {/* Thanh Chọn Trạng Thái (Luôn luôn hiển thị đầy đủ 4 trạng thái để người dùng tự do chuyển đổi) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Trạng thái đơn / phòng
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  "confirmed",
                  "pending",
                  "checked_out",
                  "maintenance",
                ] as BookingStatus[]
              ).map((st) => {
                const cfg = statusConfigs[st];
                const active = draftStatus === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setDraftStatus(st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? `${cfg.bgBadge} ring-2 ring-primary/20 shadow-xs`
                        : "bg-muted/40 border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5" />}
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chi tiết theo loại đơn */}
          {isMaintenanceWorkItem ? (
            /* ================= CHI TIẾT BẢO TRÌ PHÒNG ================= */
            <div className="space-y-4 pt-1">
              {/* Banner Thông Báo Tạm Ngưng Phòng */}
              <div className="p-4 rounded-xl bg-[#B5ADA4]/15 border border-[#B5ADA4]/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B5ADA4]/30 text-[#4C453E] flex items-center justify-center font-bold shrink-0">
                    <HardHat className="w-5 h-5 text-[#5C544C]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C645C]">
                      Kế Hoạch Bảo Trì Kỹ Thuật · Phòng {booking.roomId}
                    </span>
                    <h4 className="text-base font-bold text-foreground">
                      {booking.guestName}
                    </h4>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B5ADA4]/30 text-[#4C453E] border border-[#B5ADA4]/40 shrink-0">
                  Tạm khóa phòng
                </span>
              </div>

              {/* Thời gian thực hiện bảo trì */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground border-b border-border/30 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Thời gian tạm khóa phòng để xử lý kỹ thuật
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs">
                  {/* Bắt đầu */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      Thời điểm bắt đầu
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {formatTime(booking.checkIn)}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {formatDate(booking.checkIn)}
                    </div>
                  </div>

                  {/* Dự kiến hoàn thành */}
                  <div className="space-y-1 border-l border-border/40 pl-6">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      Dự kiến hoàn thành
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {formatTime(booking.checkOut)}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {formatDate(booking.checkOut)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hạng mục & Nội dung kỹ thuật chi tiết */}
              <div className="p-4 rounded-xl bg-card border border-border/40 space-y-2 text-xs">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Hạng mục & Nội dung sửa chữa chi tiết:
                </span>
                <p className="text-foreground/90 text-sm leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/30 font-medium">
                  {booking.note ||
                    booking.guestName ||
                    "Kiểm tra, bảo dưỡng thiết bị và khắc phục sự cố kỹ thuật phòng."}
                </p>
              </div>
            </div>
          ) : (
            /* ================= CHI TIẾT ĐƠN ĐẶT PHÒNG CỦA KHÁCH ================= */
            <div className="space-y-4 pt-1">
              {/* 1. Chi tiết Thời gian Check-in / Check-out */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground border-b border-border/30 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    Thời gian lưu trú
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                    {nightCount} Đêm
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs">
                  {/* Check-in */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      Nhận phòng (Check-in)
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {formatTime(booking.checkIn)}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {formatDate(booking.checkIn)}
                    </div>
                  </div>

                  {/* Check-out */}
                  <div className="space-y-1 border-l border-border/40 pl-6">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      Trả phòng (Check-out)
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {formatTime(booking.checkOut)}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {formatDate(booking.checkOut)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Thông tin Liên hệ & Ghi chú */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-card border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Khách hàng:</span>
                  </div>
                  <span className="font-bold text-foreground truncate max-w-[150px]">
                    {booking.guestName}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-muted-foreground">Điện thoại:</span>
                  </div>
                  {booking.guestPhone ? (
                    <a
                      href={`tel:${booking.guestPhone}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {booking.guestPhone}
                    </a>
                  ) : (
                    <span className="text-muted-foreground italic">Trống</span>
                  )}
                </div>
              </div>

              {/* 3. Tài chính & Thanh toán */}
              {booking.totalAmount !== undefined && booking.totalAmount > 0 && (
                <div className="p-4 rounded-xl bg-card border border-border/40 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-emerald-700" />
                      Tổng thanh toán:
                    </span>
                    <span className="text-base font-bold text-foreground">
                      {formatVND(booking.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground text-[11px]">
                    <span>Đã cọc/thanh toán:</span>
                    <span className="font-semibold text-emerald-800">
                      {formatVND(booking.paidAmount || 0)} ({paidPercent}%)
                    </span>
                  </div>

                  {remainingAmount > 0 && (
                    <div className="flex items-center justify-between text-amber-800 text-[11px] font-semibold">
                      <span>Còn lại cần thu:</span>
                      <span className="font-semibold">
                        {formatVND(remainingAmount)}
                      </span>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden pt-1">
                    <div
                      style={{ width: `${paidPercent}%` }}
                      className={`h-full transition-all rounded-full ${
                        paidPercent >= 100 ? "bg-[#445340]" : "bg-[#EEBA42]"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Ghi chú */}
              {booking.note && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <span className="font-bold text-amber-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Ghi chú đơn:
                  </span>
                  <p className="text-amber-900 leading-relaxed italic">
                    {booking.note}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer: Nút Thao Tác */}
        <div className="p-4 border-t border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2">
          {/* Nút Xóa đơn / Hủy lịch bảo trì */}
          <button
            onClick={() => {
              onDeleteBooking?.(booking.id);
              onClose();
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>
              {isMaintenanceWorkItem ? "Xóa lịch bảo trì" : "Hủy đơn này"}
            </span>
          </button>

          {/* Nút Hoàn tất */}
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <span>Hoàn tất</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailModal;

"use client";

import React, { useState } from "react";
import { Room, Booking, BookingStatus } from "./types";
import {
  Plus,
  Calendar as CalendarIcon,
  User,
  Phone,
  DollarSign,
  FileText,
  BedDouble,
  Clock,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onAddBooking: (newBooking: Booking) => void;
}

export const QuickBookingModal: React.FC<QuickBookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  onAddBooking,
}) => {
  // State quản lý form tạo đơn nhanh
  const [roomId, setRoomId] = useState<string>(rooms[0]?.id || "101");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

  // Shadcn Range Picker State: Mặc định lấy từ NGÀY HÔM NAY đến NGÀY MAI
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    return {
      from: today,
      to: addDays(today, 1),
    };
  });

  const [status, setStatus] = useState<BookingStatus>("confirmed");
  const [totalAmount, setTotalAmount] = useState<string>("1800000");
  const [paidAmount, setPaidAmount] = useState<string>("900000");
  const [note, setNote] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) return;

    const todayStr = format(new Date(), "yyyy-MM-dd");

    // Hardcode giờ theo quy định: Check-in 11:00, Check-out 14:00 (Sẽ chuyển vào Setting sau)
    const fromStr = dateRange?.from
      ? format(dateRange.from, "yyyy-MM-dd")
      : todayStr;
    const toStr = dateRange?.to
      ? format(dateRange.to, "yyyy-MM-dd")
      : fromStr;

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      roomId,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      checkIn: `${fromStr} 11:00`,
      checkOut: `${toStr} 14:00`,
      status,
      totalAmount: Number(totalAmount) || 0,
      paidAmount: Number(paidAmount) || 0,
      note: note.trim(),
    };

    onAddBooking(newBooking);

    // Reset form
    setGuestName("");
    setGuestPhone("");
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl border-t-4 border-t-primary font-sans">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border/40 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-foreground tracking-tight">
                Đặt Phòng Nhanh
              </DialogTitle>
              <DialogDescription className="text-[11px] font-semibold text-muted-foreground">
                Tạo đơn đặt phòng mới và cập nhật ngay lên bảng lịch
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 text-xs font-sans">
          {/* 1. Chọn Phòng & Trạng Thái dùng Shadcn Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-primary" />
                Chọn phòng:
              </label>
              <Select value={roomId} onValueChange={(val) => setRoomId(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng..." />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} ({r.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex items-center gap-1.5">
                Trạng thái ban đầu:
              </label>
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as BookingStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#445340] shrink-0" />
                      <span>Đã xác nhận</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EEBA42] shrink-0" />
                      <span>Chờ xác nhận</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="checked_out">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#5A6B7C] shrink-0" />
                      <span>Đã trả phòng</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="maintenance">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B5ADA4] shrink-0" />
                      <span>Bảo trì</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 2. Tên khách hàng & Số điện thoại dùng Shadcn Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                Tên khách hàng / Tiêu đề:
              </label>
              <Input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Số điện thoại:
              </label>
              <Input
                type="text"
                placeholder="Ví dụ: 0901234567"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Chọn Khoảng Ngày Lưu Trú dùng Shadcn Range Picker (Default: Ngày Hôm Nay ➔ Ngày Mai) */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-primary" />
                Thời gian lưu trú (Check-in ➔ Check-out)
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3 text-primary/70" />
                Check-in: 11:00 · Check-out: 14:00
              </span>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full h-10 px-3.5 py-2 rounded-xl border border-border/70 bg-card text-xs font-semibold text-foreground flex items-center justify-between shadow-xs hover:bg-accent/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-bold">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy")} (11:00) ➔{" "}
                            {format(dateRange.to, "dd/MM/yyyy")} (14:00)
                          </>
                        ) : (
                          `${format(dateRange.from, "dd/MM/yyyy")} (11:00)`
                        )
                      ) : (
                        "Chọn khoảng ngày..."
                      )}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    Chọn ngày
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 4. Giá tiền & Đã cọc dùng Shadcn Input */}
          {status !== "maintenance" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-foreground flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                  Tổng tiền (VND):
                </label>
                <Input
                  type="number"
                  placeholder="1800000"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-foreground flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                  Số tiền đã cọc (VND):
                </label>
                <Input
                  type="number"
                  placeholder="900000"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* 5. Ghi chú dùng Shadcn Input */}
          <div className="space-y-1.5">
            <label className="font-bold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Ghi chú bổ sung:
            </label>
            <Input
              type="text"
              placeholder="Yêu cầu giường đôi, đón tại sân bay..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border/60 text-xs font-bold text-foreground hover:bg-accent transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Xác nhận đặt phòng</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickBookingModal;

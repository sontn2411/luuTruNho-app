"use client";

import React, { useState } from "react";
import { CreditCard, QrCode, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingSettingsTab() {
  const [depositPct, setDepositPct] = useState("30");
  const [holdHours, setHoldHours] = useState("24");
  const [bankInfo, setBankInfo] = useState({
    bankName: "MBBank (Ngân hàng Quân Đội)",
    accountNumber: "999988886666",
    accountHolder: "STAYFLOW HOTEL LLC",
    transferPrefix: "STAYFLOW",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Cấu hình tiền cọc & giữ chỗ */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Quy định Đặt cọc & Giữ phòng
            </h3>
            <p className="text-xs text-muted-foreground">
              Thiết lập điều kiện cọc trực tuyến và thời gian giữ chỗ chờ thanh toán.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Tiền đặt cọc tối thiểu (%)</label>
            <Select value={depositPct} onValueChange={setDepositPct}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn mức % đặt cọc" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Không yêu cầu đặt cọc (0%)</SelectItem>
                <SelectItem value="30">30% Tổng giá trị đơn đặt</SelectItem>
                <SelectItem value="50">50% Tổng giá trị đơn đặt</SelectItem>
                <SelectItem value="100">100% Trả trước hoàn toàn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Thời gian tối đa giữ chỗ (Giờ)</label>
            <Select value={holdHours} onValueChange={setHoldHours}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thời gian giữ chỗ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 giờ</SelectItem>
                <SelectItem value="6">6 giờ</SelectItem>
                <SelectItem value="12">12 giờ</SelectItem>
                <SelectItem value="24">24 giờ (1 Ngày)</SelectItem>
                <SelectItem value="48">48 giờ (2 Ngày)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Thông tin Ngân hàng chuyển khoản QR */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Cấu hình Ngân hàng Nhận Thanh toán (VietQR)
            </h3>
            <p className="text-xs text-muted-foreground">
              Thông tin sẽ tự động tạo mã QR động chuyển khoản cho khách hàng khi đặt phòng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Ngân hàng hưởng thụ</label>
            <Input
              type="text"
              value={bankInfo.bankName}
              onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Số tài khoản ngân hàng</label>
            <Input
              type="text"
              value={bankInfo.accountNumber}
              onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
              className="font-mono font-bold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Chủ tài khoản (Viết hoa không dấu)</label>
            <Input
              type="text"
              value={bankInfo.accountHolder}
              onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
              className="font-bold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Cú pháp nội dung chuyển khoản</label>
            <Input
              type="text"
              value={bankInfo.transferPrefix}
              onChange={(e) => setBankInfo({ ...bankInfo, transferPrefix: e.target.value })}
              className="font-mono font-bold"
              required
            />
            <p className="text-[11px] text-muted-foreground">Ví dụ: STAYFLOW [Mã đặt phòng]</p>
          </div>
        </div>
      </div>

      {/* Action Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isSaved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Đã lưu cài đặt thanh toán & QR thành công!
          </span>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="active:scale-95 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4 mr-1.5" />
          <span>Lưu cài đặt thanh toán</span>
        </Button>
      </div>
    </form>
  );
}

export default BookingSettingsTab;

"use client";

import React, { useState } from "react";
import { Bell, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationSettingsTab() {
  const [notifications, setNotifications] = useState({
    newBookingSound: true,
    newBookingToast: true,
    autoConfirmEmail: true,
    autoReminderEmail: true,
    smsReminder: false,
    dirtyAlert: true,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Thông báo Hệ thống / Dashboard */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Thông báo Chuông & Cảnh báo Hệ thống
            </h3>
            <p className="text-xs text-muted-foreground">
              Nhận phản hồi trực quan và âm thanh ngay khi có sự thay đổi dữ liệu đặt phòng.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <span className="font-bold text-foreground block">Âm thanh chuông báo Đặt phòng mới</span>
              <p className="text-[11px] text-muted-foreground">Phát âm báo khi có khách vừa hoàn tất đặt phòng trực tuyến.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications.newBookingSound}
                onChange={() => toggle("newBookingSound")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 py-1 border-t border-border/40 pt-3">
            <div>
              <span className="font-bold text-foreground block">Thông báo nổi Toast trên màn hình</span>
              <p className="text-[11px] text-muted-foreground">Hiển thị khung thông báo ở góc màn hình Dashboard.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications.newBookingToast}
                onChange={() => toggle("newBookingToast")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 py-1 border-t border-border/40 pt-3">
            <div>
              <span className="font-bold text-foreground block">Cảnh báo Phòng trễ giờ / Cần dọn</span>
              <p className="text-[11px] text-muted-foreground">Nhắc nhở lễ tân khi phòng quá giờ trả hoặc phòng dọn lâu.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications.dirtyAlert}
                onChange={() => toggle("dirtyAlert")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Tự động Gửi Email cho Khách hàng */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Email Tự động gửi Khách hàng
            </h3>
            <p className="text-xs text-muted-foreground">
              Cấu hình các luồng gửi thư điện tử chăm sóc và xác nhận thông tin lưu trú.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between gap-4 py-1">
            <div>
              <span className="font-bold text-foreground block">Email Xác nhận Đặt phòng thành công</span>
              <p className="text-[11px] text-muted-foreground">Gửi phiếu xác nhận kèm mã QR Check-in đến Email khách hàng.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications.autoConfirmEmail}
                onChange={() => toggle("autoConfirmEmail")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 py-1 border-t border-border/40 pt-3">
            <div>
              <span className="font-bold text-foreground block">Email Nhắc nhở trước ngày Nhận phòng</span>
              <p className="text-[11px] text-muted-foreground">Gửi thư nhắc lịch lưu trú trước 24 giờ cho khách hàng.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifications.autoReminderEmail}
                onChange={() => toggle("autoReminderEmail")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isSaved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Đã lưu cài đặt thông báo thành công!
          </span>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="active:scale-95 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4 mr-1.5" />
          <span>Lưu cài đặt thông báo</span>
        </Button>
      </div>
    </form>
  );
}

export default NotificationSettingsTab;

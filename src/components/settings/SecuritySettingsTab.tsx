"use client";

import React, { useState } from "react";
import { KeyRound, Smartphone, Laptop, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SecuritySettingsTab() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactor, setTwoFactor] = useState(false);
  const [isPasswordSaved, setIsPasswordSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu mới không trùng khớp!");
      return;
    }
    setIsPasswordSaved(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setIsPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Đổi mật khẩu */}
      <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Đổi Mật khẩu Tài khoản Quản trị
            </h3>
            <p className="text-xs text-muted-foreground">
              Cập nhật mật khẩu định kỳ để đảm bảo an toàn tối đa cho hệ thống khách sạn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Mật khẩu hiện tại</label>
            <Input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Mật khẩu mới</label>
            <Input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Nhập lại mật khẩu mới</label>
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {isPasswordSaved && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Đổi mật khẩu thành công!
            </span>
          )}
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="active:scale-95 shadow-xs cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            <span>Cập nhật mật khẩu</span>
          </Button>
        </div>
      </form>

      {/* Xác thực 2 bước 2FA */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Xác thực Hai Yếu tố (2FA - OTP)
              </h3>
              <p className="text-xs text-muted-foreground">
                Yêu cầu mã xác thực qua Google Authenticator khi đăng nhập thiết bị mới.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </div>

      {/* Thiết bị đang đăng nhập */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Phiên Đăng nhập & Thiết bị Hoạt động
            </h3>
            <p className="text-xs text-muted-foreground">
              Quản lý các thiết bị hiện đang đăng nhập vào hệ thống StayFlow.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {/* Thiết bị 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-card border border-border/60 flex items-center justify-center font-bold text-foreground">
                💻
              </div>
              <div>
                <span className="font-bold text-foreground block">Windows PC - Chrome Browser</span>
                <span className="text-[11px] text-muted-foreground">TP. Hồ Chí Minh • IP: 14.241.12.89 • Đang hoạt động</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Thiết bị hiện tại
            </span>
          </div>

          {/* Thiết bị 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-card border border-border/60 flex items-center justify-center font-bold text-foreground">
                📱
              </div>
              <div>
                <span className="font-bold text-foreground block">iPhone 15 Pro - StayFlow App</span>
                <span className="text-[11px] text-muted-foreground">TP. Hồ Chí Minh • IP: 113.161.4.12 • Hoạt động 2 giờ trước</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 rounded-xl font-semibold text-[11px]"
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettingsTab;

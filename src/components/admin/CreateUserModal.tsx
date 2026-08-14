/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { createNewUserAccount } from "@/app/admin/actions";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await createNewUserAccount({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        isAdmin,
      });

      setEmail("");
      setPassword("");
      setFullName("");
      setIsAdmin(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || "Đã xảy ra lỗi khi tạo tài khoản.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] p-6 space-y-4 rounded-2xl">
        <DialogHeader className="space-y-1 text-left">
          <div className="flex items-center gap-2 text-primary">
            <div className="p-2 rounded-xl bg-primary/10">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold font-display">
              Tạo người dùng mới
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Nhập thông tin tài khoản để thêm mới vào hệ thống Supabase Auth.
          </DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Địa chỉ Email <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                required
                placeholder="vd: user@stayflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Mật khẩu ban đầu <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-10 text-xs rounded-xl bg-muted/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              Họ và tên (Tùy chọn)
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="vd: Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 h-10 text-xs rounded-xl bg-muted/30"
              />
            </div>
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl h-10 text-xs font-medium"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl h-10 text-xs font-bold gap-2"
            >
              {isLoading ? (
                "Đang tạo..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Tạo người dùng</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

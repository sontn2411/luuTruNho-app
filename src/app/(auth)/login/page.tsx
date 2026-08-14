"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  KeyRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/stores/useUserStore";
import { useLoading } from "@/providers/LoadingProvider";

const eyebrowClass =
  "m-0 text-[10px] font-extrabold uppercase leading-[1.3] tracking-[0.19em] text-secondary";

export default function LoginPage() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);
    showLoading("Đang xác thực thông tin tài khoản...");

    try {
      const supabase = createClient();
      const { error, data: dataResponse } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        setAuthError(
          "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.",
        );
        hideLoading();
        setIsLoading(false);
      } else {
        // Lưu user vào Zustand Store ngay lập tức
        if (dataResponse?.user) {
          setUser(dataResponse.user);
        }

        // Đăng nhập thành công: GIỮ NGUYÊN MÀN HÌNH LOADING đến khi chuyển xong trang
        showLoading("Đăng nhập thành công! Đang vào hệ thống...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setAuthError("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
      hideLoading();
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative flex h-screen max-h-screen overflow-hidden flex-col bg-background max-[680px]:h-auto max-[680px]:max-h-none max-[680px]:overflow-auto"
      aria-labelledby="login-title"
    >
      <div className="flex items-center gap-[9px] px-[clamp(28px,6vw,92px)] pt-[31px] text-[9px] font-extrabold uppercase leading-none tracking-[0.14em] text-[#8a8276] max-[900px]:px-[38px] max-[680px]:overflow-hidden max-[680px]:whitespace-nowrap max-[680px]:px-[25px] max-[680px]:pt-[67px] max-[680px]:text-[8px]">
        <span
          className="size-[6px] shrink-0 rounded-full bg-secondary"
          aria-hidden="true"
        />
        <span>Dành cho người chăm sóc không gian</span>
        <span
          className="ml-0.5 h-px w-[33px] shrink-0 bg-[#c8bfb2]"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto my-auto w-full max-w-[500px] px-7 pb-8 pt-[35px] max-[680px]:px-[25px] max-[680px]:pb-[43px] max-[680px]:pt-[42px] overflow-hidden">
        <div className="relative animate-[rise-in_600ms_100ms_var(--ease-out)_both]">
          <div
            className="mb-[20px] grid size-[43px] rotate-[-7deg] place-items-center rounded-[50%_50%_50%_10px] bg-[#e4e7d9] text-primary"
            aria-hidden="true"
          >
            <KeyRound size={19} strokeWidth={1.7} />
          </div>
          <p className={`${eyebrowClass} mb-2`}>Xin chào, chủ nhà</p>
          <h2
            id="login-title"
            className="m-0 font-display text-[clamp(39px,4vw,52px)] font-normal leading-none tracking-[-0.045em] max-[680px]:text-[43px]"
          >
            Mừng bạn trở lại.
          </h2>
          <p className="mb-0 mt-[14px] max-w-[305px] text-[13px] font-medium leading-[1.7] text-muted-foreground">
            Đăng nhập để tiếp tục chăm sóc những ngày ở thật dễ chịu.
          </p>
        </div>

        {authError && (
          <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold animate-in fade-in duration-200">
            {authError}
          </div>
        )}

        <form
          className="mt-[24px] grid animate-[rise-in_600ms_170ms_var(--ease-out)_both] gap-[18px] max-[680px]:mt-[24px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-[9px]">
            <label
              className="text-[11px] font-extrabold tracking-[0.02em] text-[#5d574d]"
              htmlFor="email"
            >
              Email hoặc tên đăng nhập
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-[17px] z-[1] text-[#9f9587]"
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                placeholder="Nhập email"
                autoComplete="email"
                {...register("email")}
                className="h-[52px] w-full rounded-[3px] border-input bg-[#fbf8f1]/60 px-[43px] py-0 text-[13px] font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.34)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:font-medium placeholder:text-[#aaa296] hover:border-[#c0b5a5] focus:border-secondary focus:bg-[#fbf8f1] focus:outline-none focus:ring-[3px] focus:ring-secondary/12"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive font-medium m-0">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-[9px]">
            <div className="flex items-center justify-between gap-3">
              <label
                className="text-[11px] font-extrabold tracking-[0.02em] text-[#5d574d]"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <button
                className="border-0 bg-transparent p-0 text-[10px] font-extrabold text-secondary transition-colors duration-200 hover:text-[#6b3c24]"
                type="button"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <LockKeyhole
                className="pointer-events-none absolute left-4 top-[17px] z-[1] text-[#9f9587]"
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu của bạn"
                autoComplete="current-password"
                {...register("password")}
                className="h-[52px] w-full rounded-[3px] border-input bg-[#fbf8f1]/60 px-[43px] py-0 pr-12 text-[13px] font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.34)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:font-medium placeholder:text-[#aaa296] hover:border-[#c0b5a5] focus:border-secondary focus:bg-[#fbf8f1] focus:outline-none focus:ring-[3px] focus:ring-secondary/12"
              />
              <button
                className="absolute right-0 top-0 grid h-[52px] w-12 place-items-center border-0 bg-transparent text-[#9f9587] transition-colors duration-200 hover:text-primary"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive font-medium m-0">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="-mt-0.5 flex items-center justify-between gap-2.5">
            <label
              className="flex items-center gap-[9px] text-[11px] font-semibold text-muted-foreground"
              htmlFor="remember-device"
            >
              <Checkbox
                id="remember-device"
                checked={rememberDevice}
                onCheckedChange={(checked) =>
                  setRememberDevice(checked === true)
                }
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <span>Ghi nhớ thiết bị này</span>
            </label>
            <span className="inline-flex items-center gap-[5px] text-[10px] font-bold text-[#968d80]">
              <LockKeyhole size={13} aria-hidden="true" /> Riêng tư
            </span>
          </div>

          <Button
            disabled={isLoading}
            className="mt-[5px] flex h-[55px] w-full items-center justify-between rounded-[3px] border-0 bg-secondary px-2 pl-[19px] text-[12px] font-extrabold tracking-[0.015em] text-secondary-foreground shadow-[0_10px_22px_rgba(143,91,58,0.19)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#7b482d] hover:shadow-[0_13px_27px_rgba(143,91,58,0.28)] active:scale-[0.97] disabled:opacity-50"
            type="submit"
          >
            <span>{isLoading ? "Đang xác thực..." : "Vào khu quản lý"}</span>
            <span
              className="grid size-[39px] place-items-center rounded-[2px] bg-white/14"
              aria-hidden="true"
            >
              <ArrowRight size={17} strokeWidth={2} />
            </span>
          </Button>
        </form>

        <div className="my-[31px] flex items-center gap-[13px] text-[#a1988b]">
          <span className="h-px flex-1 bg-[#ded6ca]" />
          <p className="m-0 font-display text-[15px] italic">hoặc</p>
          <span className="h-px flex-1 bg-[#ded6ca]" />
        </div>

        <button
          className="flex w-full items-center justify-center gap-[7px] border-0 bg-transparent p-0 text-[11px] font-semibold text-[#837a6e] transition-colors duration-200 hover:text-foreground"
          type="button"
          onClick={() => router.push("/register")}
        >
          <Sparkles className="text-secondary" size={16} strokeWidth={1.7} />
          <span>Đây là lần đầu bạn ghé qua?</span>
          <strong className="font-extrabold text-secondary">
            Nhận hướng dẫn
          </strong>
        </button>
      </div>

      <footer className="mt-auto px-[clamp(28px,6vw,92px)] pb-[31px] max-[900px]:px-[38px] max-[680px]:px-[25px] max-[680px]:pb-[25px]">
        <div
          className="mb-[15px] h-px w-full bg-[#dfd7cb]"
          aria-hidden="true"
        />
        <p className="m-0 flex items-center justify-between gap-4 text-[9px] font-bold tracking-[0.04em] text-[#a1988b] max-[390px]:block max-[390px]:leading-[1.8]">
          <span>© 2026 Lưu Trú Nhỏ</span>
          <span className="hidden" aria-hidden="true" />
          <span className="max-[390px]:block">Vận hành nhỏ, chăm chút lớn</span>
        </p>
      </footer>
    </section>
  );
}

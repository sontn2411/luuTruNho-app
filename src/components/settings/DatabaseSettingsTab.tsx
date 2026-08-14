"use client";

import React, { useState } from "react";
import {
  Database,
  Server,
  Key,
  Globe,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  HardDrive,
  Table,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DatabaseSettingsTab() {
  const [supabaseConfig, setSupabaseConfig] = useState({
    projectUrl: "https://stayflow-tenant-01.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXlmbG93LXRlbmFudC0wMSIsInJvbGUiOiJhbW9uIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjIwMTk2NDMyMDB9.sampleAnonKeyTokenStayFlow2026",
    serviceRoleKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXlmbG93LXRlbmFudC0wMSIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3MDQwNjcyMDAsImV4cCI6MjAxOTY0MzIwMH0.sampleServiceRoleSecret2026",
    schema: "public",
  });

  const [showAnonKey, setShowAnonKey] = useState(false);
  const [showServiceKey, setShowServiceKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    latency: number;
    message: string;
  } | null>({
    success: true,
    latency: 42,
    message: "Kết nối thành công tới Supabase Instance biệt lập!",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        latency: Math.floor(Math.random() * 30) + 25,
        message: "Kết nối Supabase riêng biệt đạt trạng thái hoàn hảo!",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Thẻ Phân định Kiến trúc Hệ thống & Đơn vị */}
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary text-primary-foreground flex items-center justify-center shadow-xs">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Mô hình Cơ sở dữ liệu Biệt lập (Dedicated Tenant Database)
            </h3>
            <p className="text-xs text-muted-foreground">
              Đảm bảo an toàn và bảo mật dữ liệu tối đa cho từng đơn vị khách sạn.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>DB Hệ thống (System Core DB)</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Quản lý tài khoản đăng nhập người dùng, đăng ký gói dịch vụ và phân quyền chung của toàn hệ thống StayFlow.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>DB Đơn vị riêng (Supabase Tenant DB)</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Lưu trữ độc lập toàn bộ danh sách phòng, lịch đặt phòng, hóa đơn và thông tin khách hàng của riêng đơn vị bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Cấu hình kết nối Supabase Tenant */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Thông tin Kết nối Supabase Tenant
              </h3>
              <p className="text-xs text-muted-foreground">
                Cấu hình API Key và Project URL Supabase riêng biệt cho đơn vị.
              </p>
            </div>
          </div>

          {/* Badge trạng thái kết nối */}
          {testResult && (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border shrink-0 ${
                testResult.success
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                  : "bg-rose-500/10 text-rose-600 border-rose-500/25"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {testResult.success ? `Đã kết nối (${testResult.latency}ms)` : "Mất kết nối"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4 text-xs">
          {/* Supabase Project URL */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              Supabase Project URL
            </label>
            <Input
              type="text"
              value={supabaseConfig.projectUrl}
              onChange={(e) => setSupabaseConfig({ ...supabaseConfig, projectUrl: e.target.value })}
              placeholder="https://xyztenant.supabase.co"
              className="font-mono"
              required
            />
          </div>

          {/* Supabase Anon Public Key */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-muted-foreground" />
              Supabase Anon Key (Public API Key)
            </label>
            <div className="relative">
              <Input
                type={showAnonKey ? "text" : "password"}
                value={supabaseConfig.anonKey}
                onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                className="font-mono pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowAnonKey(!showAnonKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showAnonKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Supabase Service Role Key */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              Supabase Service Role Key (Server-side Secret)
            </label>
            <div className="relative">
              <Input
                type={showServiceKey ? "text" : "password"}
                value={supabaseConfig.serviceRoleKey}
                onChange={(e) => setSupabaseConfig({ ...supabaseConfig, serviceRoleKey: e.target.value })}
                className="font-mono pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowServiceKey(!showServiceKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showServiceKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Khóa bảo mật chỉ sử dụng ở môi trường Server side để thực hiện đồng bộ dữ liệu.
            </p>
          </div>

          {/* Schema */}
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
              Database Schema
            </label>
            <Input
              type="text"
              value={supabaseConfig.schema}
              onChange={(e) => setSupabaseConfig({ ...supabaseConfig, schema: e.target.value })}
              className="font-mono w-48"
              required
            />
          </div>
        </div>

        {/* Nút Test connection */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/40">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="cursor-pointer font-semibold rounded-xl"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${isTesting ? "animate-spin text-secondary" : ""}`} />
            <span>{isTesting ? "Đang kiểm tra kết nối..." : "Kiểm tra kết nối Supabase"}</span>
          </Button>

          {testResult && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {testResult.message}
            </span>
          )}
        </div>
      </div>

      {/* Danh sách các Bảng Dữ liệu Đơn vị (Synced Tables) */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Danh mục Bảng Dữ liệu Đơn vị (Tenant Schema Tables)
            </h3>
            <p className="text-xs text-muted-foreground">
              Trạng thái khởi tạo cấu trúc dữ liệu lưu trú trên Supabase riêng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {[
            { name: "rooms", label: "Danh sách phòng", rows: 50, status: "Active" },
            { name: "bookings", label: "Đơn đặt phòng", rows: 128, status: "Active" },
            { name: "guests", label: "Thông tin khách", rows: 340, status: "Active" },
            { name: "invoices", label: "Hóa đơn thanh toán", rows: 96, status: "Active" },
            { name: "services", label: "Dịch vụ phụ thu", rows: 18, status: "Active" },
            { name: "room_types", label: "Cấu hình loại phòng", rows: 6, status: "Active" },
          ].map((tbl) => (
            <div
              key={tbl.name}
              className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-foreground block font-mono">
                  {tbl.name}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {tbl.label} • {tbl.rows} bản ghi
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isSaved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Đã lưu cài đặt kết nối Supabase thành công!
          </span>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="active:scale-95 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4 mr-1.5" />
          <span>Lưu cấu hình Supabase</span>
        </Button>
      </div>
    </form>
  );
}

export default DatabaseSettingsTab;

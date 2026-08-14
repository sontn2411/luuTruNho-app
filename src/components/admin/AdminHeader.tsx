"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, RefreshCw, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  isLoadingData: boolean;
  onRefresh: () => void;
  onOpenCreateModal: () => void;
}

export function AdminHeader({
  isLoadingData,
  onRefresh,
  onOpenCreateModal,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 hover:underline text-muted-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <span>/</span>
          <span>Admin Console</span>
        </div>
        <h1 className="text-3xl font-display font-bold tracking-tight flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          Quản lý Người dùng System
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý toàn bộ tài khoản trong Auth Server Supabase và phân quyền Super Admin.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <Button
          onClick={onRefresh}
          variant="outline"
          disabled={isLoadingData}
          className="gap-2 border-border/80 hover:bg-accent h-10 rounded-xl"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingData ? "animate-spin" : ""}`} />
          <span>Làm mới</span>
        </Button>

        <Button
          onClick={onOpenCreateModal}
          className="gap-2 h-10 rounded-xl font-bold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tạo người dùng mới</span>
        </Button>
      </div>
    </div>
  );
}

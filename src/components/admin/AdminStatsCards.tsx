"use client";

import { Users, ShieldCheck, KeyRound } from "lucide-react";

interface AdminStatsCardsProps {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
}

export function AdminStatsCards({
  totalUsers,
  totalAdmins,
  totalRegularUsers,
}: AdminStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tổng số Người dùng
          </p>
          <h2 className="text-3xl font-extrabold mt-1">{totalUsers}</h2>
        </div>
        <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
          <Users className="w-6 h-6" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quản trị viên (Admin)
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-emerald-600 dark:text-emerald-400">
            {totalAdmins}
          </h2>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tài khoản Người dùng
          </p>
          <h2 className="text-3xl font-extrabold mt-1">{totalRegularUsers}</h2>
        </div>
        <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary">
          <KeyRound className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Building2, Layers, MapPin } from "lucide-react";

interface OrganizationStatsCardsProps {
  totalOrganizations: number;
}

export function OrganizationStatsCards({
  totalOrganizations,
}: OrganizationStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tổng số Tổ chức
          </p>
          <h2 className="text-3xl font-extrabold mt-1">{totalOrganizations}</h2>
        </div>
        <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hệ thống Quản lý
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-emerald-600 dark:text-emerald-400">
            Homestay / Hotel
          </h2>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600">
          <Layers className="w-6 h-6" />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phạm vi Vận hành
          </p>
          <h2 className="text-3xl font-extrabold mt-1 text-secondary">Toàn quốc</h2>
        </div>
        <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary">
          <MapPin className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

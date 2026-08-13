"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  LogIn,
  LogOut,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  LucideIcon,
} from "lucide-react";

export interface MetricItem {
  title: string;
  value: string;
  subtext: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  badgeColor: string;
  borderLeftColor: string;
  href: string;
  icon: LucideIcon;
  iconBoxBg: string;
}

const DEFAULT_METRICS: MetricItem[] = [
  {
    title: "CÔNG SUẤT PHÒNG",
    value: "78%",
    subtext: "6 / 8 phòng",
    badgeText: "12%",
    badgeIcon: ArrowUpRight,
    badgeColor: "bg-emerald-100/90 text-emerald-800",
    borderLeftColor: "border-l-emerald-800",
    href: "/rooms",
    icon: Home,
    iconBoxBg: "bg-emerald-100/60 text-emerald-900",
  },
  {
    title: "NHẬN PHÒNG HÔM NAY",
    value: "3",
    subtext: "2 đã xác nhận",
    badgeText: "2 mới",
    badgeIcon: ArrowUpRight,
    badgeColor: "bg-emerald-100/90 text-emerald-800",
    borderLeftColor: "border-l-[#6b3319]",
    href: "/bookings",
    icon: LogIn,
    iconBoxBg: "bg-stone-200/60 text-stone-800",
  },
  {
    title: "TRẢ PHÒNG HÔM NAY",
    value: "1",
    subtext: "11:00 · Phòng Gió",
    badgeText: "1 cần xử lý",
    badgeIcon: ArrowDownLeft,
    badgeColor: "bg-orange-100/90 text-amber-900",
    borderLeftColor: "border-l-[#7a5c29]",
    href: "/bookings",
    icon: LogOut,
    iconBoxBg: "bg-stone-200/60 text-stone-800",
  },
  {
    title: "DOANH THU THÁNG NÀY",
    value: "48,6tr",
    subtext: "so với 44,9tr tháng trước",
    badgeText: "8.4%",
    badgeIcon: ArrowUpRight,
    badgeColor: "bg-emerald-100/90 text-emerald-800",
    borderLeftColor: "border-l-[#854320]",
    href: "/finance",
    icon: Wallet,
    iconBoxBg: "bg-stone-200/60 text-stone-800",
  },
];

interface MetricCardsProps {
  metrics?: MetricItem[];
}

export function MetricCards({ metrics = DEFAULT_METRICS }: MetricCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const BadgeIcon = metric.badgeIcon;

        return (
          <Link
            key={metric.title}
            href={metric.href}
            className={`group flex flex-col justify-between rounded-xl bg-card p-4 shadow-xs border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${metric.borderLeftColor}`}
          >
            {/* Top Row: Icon box + Pill badge */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.iconBoxBg}`}
              >
                <Icon className="h-4 w-4 stroke-[2]" />
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${metric.badgeColor}`}
              >
                <BadgeIcon className="h-3 w-3" />
                <span>{metric.badgeText}</span>
              </div>
            </div>

            {/* Middle Row: Title */}
            <div className="mt-3.5 mb-1 text-[11px] font-bold tracking-wider text-muted-foreground/80 uppercase">
              {metric.title}
            </div>

            {/* Bottom Row: Value + Subtext */}
            <div className="flex items-baseline justify-between gap-2 mt-auto">
              <span className="text-3xl font-display font-bold text-foreground tracking-tight">
                {metric.value}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground/80 text-right">
                {metric.subtext}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MetricCards;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MetricCards } from "@/components/dashboard/metric-cards";

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("Hôm nay");

  return (
    <div className="min-h-screen p-8 w-full space-y-6">
      {/* 1. Header Row */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold font-display text-foreground">
          Dashboard
        </h1>

        {/* Dropdown ngày tháng và Button Đặt phòng */}
        <div className="flex items-center gap-3">
          {/* Dropdown Lọc Ngày */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-accent transition-all duration-200 shadow-xs outline-none cursor-pointer">
              <Calendar className="w-4 h-4 text-secondary" />
              <span>{dateFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1.5 rounded-2xl">
              {[
                "Hôm nay",
                "7 ngày qua",
                "Tháng này",
                "Tháng trước",
                "Năm nay",
              ].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setDateFilter(item)}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-medium ${
                    dateFilter === item
                      ? "bg-accent font-semibold text-primary"
                      : ""
                  }`}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Button Đặt phòng */}
          <Link
            href="/bookings"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold shadow-md hover:bg-[#7b482d] hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo đặt phòng</span>
          </Link>
        </div>
      </div>

      {/* 2. Section Chỉ Số Thống Kê */}
      <MetricCards />
    </div>
  );
}

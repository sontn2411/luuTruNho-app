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
import { QuickBookingModal } from "@/components/bookings/QuickBookingModal";
import { ROOMS } from "@/components/bookings/mock-data";
import { Booking } from "@/components/bookings/types";

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("Hôm nay");
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);

  const handleAddBooking = (newBooking: Booking) => {
    // Tạm thời log ra, sau này sẽ tích hợp API hoặc global state
    console.log("Đã tạo booking mới từ Dashboard:", newBooking);
  };

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
          <button
            onClick={() => setIsQuickBookingOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-secondary text-primary-foreground text-xs font-bold  transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Đặt phòng nhanh</span>
          </button>
        </div>
      </div>

      {/* 2. Section Chỉ Số Thống Kê */}
      <MetricCards />

      {/* 3. Modal Đặt Phòng Nhanh */}
      <QuickBookingModal
        isOpen={isQuickBookingOpen}
        onClose={() => setIsQuickBookingOpen(false)}
        rooms={ROOMS}
        onAddBooking={handleAddBooking}
      />
    </div>
  );
}

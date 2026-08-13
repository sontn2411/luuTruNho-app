"use client";

import React, { useState } from "react";
import { Plus, Search, LayoutGrid, List, BedDouble } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface RoomsHeaderProps {
  onAddRoom?: () => void;
  onSearchChange?: (query: string) => void;
  onViewModeChange?: (mode: "grid" | "table") => void;
  defaultViewMode?: "grid" | "table";
}

export function RoomsHeader({
  onAddRoom,
  onSearchChange,
  onViewModeChange,
  defaultViewMode = "table",
}: RoomsHeaderProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">(defaultViewMode);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewChange = (mode: "grid" | "table") => {
    setViewMode(mode);
    onViewModeChange?.(mode);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearchChange?.(val);
  };

  return (
    <div className="w-full py-3 space-y-4">
      {/* 1. Header Row chuẩn phong cách StayFlow Dashboard */}
      <PageHeader
        icon={BedDouble}
        title="Quản lý phòng"
        description="Theo dõi tình trạng, cấu hình thông tin và phân loại các phòng nghỉ trong hệ thống."
        action={
          <button
            onClick={onAddRoom}
            className="px-4 py-2 rounded-xl bg-secondary text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5 hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm phòng mới</span>
          </button>
        }
      />

      {/* 2. Thanh Công cụ Tìm kiếm & Chế độ xem */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Tìm theo số phòng, loại phòng..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary/50 shadow-xs"
          />
        </div>

        {/* Nút chuyển dạng Lưới / Danh sách */}
        <div className="flex items-center p-1 rounded-xl bg-card border border-border text-xs font-semibold shadow-xs">
          <button
            onClick={() => handleViewChange("grid")}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-secondary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Hiển thị dạng lưới"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewChange("table")}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === "table"
                ? "bg-secondary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Hiển thị dạng danh sách"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomsHeader;

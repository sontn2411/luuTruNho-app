"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSearchToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
}

export function AdminSearchToolbar({
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}: AdminSearchToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo Email, Tên hoặc User ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 rounded-xl bg-card border-border/60 text-xs font-medium"
        />
      </div>

      <div className="text-xs font-medium text-muted-foreground self-end sm:self-auto">
        Hiển thị <strong className="text-foreground">{filteredCount}</strong> / {totalCount} tài khoản
      </div>
    </div>
  );
}

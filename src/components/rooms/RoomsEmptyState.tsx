import React from "react";
import { SearchX } from "lucide-react";

interface RoomsEmptyStateProps {
  searchQuery?: string;
}

export function RoomsEmptyState({ searchQuery }: RoomsEmptyStateProps) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-12 h-12 rounded-xl bg-accent text-muted-foreground flex items-center justify-center mb-3 border border-border shadow-xs">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1">
        Không tìm thấy phòng nào
      </h3>
      <p className="text-xs text-muted-foreground max-w-sm">
        {searchQuery
          ? `Không có kết quả phù hợp với từ khóa "${searchQuery}". Thử tìm kiếm với số phòng hoặc loại phòng khác.`
          : "Hiện chưa có thông tin phòng nghỉ trong hệ thống."}
      </p>
    </div>
  );
}

export default RoomsEmptyState;

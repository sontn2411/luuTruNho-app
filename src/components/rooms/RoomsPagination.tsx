import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RoomsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function RoomsPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: RoomsPaginationProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 px-1">
      {/* Thông tin hiển thị */}
      <div className="text-xs text-muted-foreground font-semibold">
        Hiển thị{" "}
        <span className="font-bold text-foreground">{startItem}</span> -{" "}
        <span className="font-bold text-foreground">{endItem}</span> trên tổng
        số <span className="font-bold text-foreground">{totalItems}</span> phòng
      </div>

      {/* Các nút bấm phân trang */}
      <div className="flex items-center gap-1.5">
        {/* Nút Trước */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-xl border border-border/60 bg-card text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Trước</span>
        </button>

        {/* Cụm số trang */}
        <div className="flex items-center gap-1 bg-card border border-border/60 rounded-xl p-1 shadow-xs">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 rounded-lg font-bold transition-all cursor-pointer text-xs flex items-center justify-center ${
                currentPage === page
                  ? "bg-secondary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Nút Sau */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-xl border border-border/60 bg-card text-xs font-semibold text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default RoomsPagination;

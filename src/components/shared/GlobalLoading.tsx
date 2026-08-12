"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface GlobalLoadingProps {
  isLoading: boolean;
  message?: string;
}

export const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  isLoading,
  message = "Đang xử lý...",
}) => {
  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Minimalist Floating Pill */}
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-card border border-border shadow-xl shadow-black/5 text-foreground">
        <Loader2 className="w-5 h-5 text-secondary animate-spin stroke-[2.5]" />
        <span className="text-sm font-medium tracking-wide">
          {message}
        </span>
      </div>
    </div>
  );
};

export default GlobalLoading;

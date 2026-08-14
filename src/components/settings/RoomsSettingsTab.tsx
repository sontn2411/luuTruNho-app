"use client";

import React, { useState } from "react";
import { BedDouble, Save, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RoomsSettingsTab() {
  const [autoDirty, setAutoDirty] = useState(true);
  const [overtimePolicy, setOvertimePolicy] = useState({
    tier1Hours: "3",
    tier1FeePct: "30",
    tier2Hours: "6",
    tier2FeePct: "50",
    fullDayFeePct: "100",
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Tự động đổi trạng thái dọn dẹp */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Tự động Chuyển Trạng thái Dọn dẹp
              </h3>
              <p className="text-xs text-muted-foreground">
                Khi lễ tân bấm &quot;Trả phòng (Check-out)&quot;, hệ thống sẽ tự động cập nhật phòng sang trạng thái Chưa dọn.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={autoDirty}
              onChange={(e) => setAutoDirty(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </div>

      {/* Quy định Phụ thu Quá giờ */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/40">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Quy định Phụ thu Trả phòng Quá giờ (Check-out muộn)
            </h3>
            <p className="text-xs text-muted-foreground">
              Tự động gợi ý mức phí phụ thu trên hóa đơn khi khách trả phòng trễ.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <span className="font-bold text-foreground block">
              Khung 1: Trễ dưới {overtimePolicy.tier1Hours} tiếng
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Phụ thu:</span>
              <Input
                type="number"
                value={overtimePolicy.tier1FeePct}
                onChange={(e) => setOvertimePolicy({ ...overtimePolicy, tier1FeePct: e.target.value })}
                className="w-20 text-center font-bold"
              />
              <span className="font-semibold text-foreground">% tiền giá phòng/đêm</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <span className="font-bold text-foreground block">
              Khung 2: Trễ từ {overtimePolicy.tier1Hours} đến {overtimePolicy.tier2Hours} tiếng
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Phụ thu:</span>
              <Input
                type="number"
                value={overtimePolicy.tier2FeePct}
                onChange={(e) => setOvertimePolicy({ ...overtimePolicy, tier2FeePct: e.target.value })}
                className="w-20 text-center font-bold"
              />
              <span className="font-semibold text-foreground">% tiền giá phòng/đêm</span>
            </div>
          </div>

          <div className="md:col-span-2 p-3.5 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-foreground">Khung 3: Trễ quá 6 tiếng</span>
              <p className="text-[11px] text-muted-foreground">Tự động tính bằng giá phòng 1 đêm nguyên vẹn.</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary font-bold text-xs border border-secondary/20">
              100% Giá đêm
            </span>
          </div>
        </div>
      </div>

      {/* Action Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {isSaved && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Đã lưu quy định phòng thành công!
          </span>
        )}
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="active:scale-95 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4 mr-1.5" />
          <span>Lưu cấu hình phòng</span>
        </Button>
      </div>
    </form>
  );
}

export default RoomsSettingsTab;

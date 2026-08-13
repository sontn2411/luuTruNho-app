"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={vi}
      showOutsideDays={showOutsideDays}
      className={cn("p-4 font-sans select-none min-w-[320px]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3 w-full relative",
        month_caption:
          "flex items-center h-10 px-1 border-b border-border/30 mb-2",
        caption_label:
          "text-sm font-bold text-foreground capitalize tracking-tight",
        nav: "absolute top-5.5 right-0 flex items-center gap-1 z-20",
        button_previous:
          "h-7 w-7 bg-muted/60 hover:bg-muted text-foreground flex items-center justify-center rounded-lg border border-border/60 transition-all cursor-pointer shadow-xs",
        button_next:
          "h-7 w-7 bg-muted/60 hover:bg-muted text-foreground flex items-center justify-center rounded-lg border border-border/60 transition-all cursor-pointer shadow-xs",
        month_grid: "w-full border-collapse space-y-1.5",
        weekdays: "flex justify-between mb-2",
        weekday:
          "text-muted-foreground w-10 text-center font-bold text-[11px] uppercase tracking-wider",
        week: "flex w-full justify-between mt-1",
        day: "h-10 w-10 text-center text-xs p-0 relative flex items-center justify-center focus-within:relative focus-within:z-20",
        day_button:
          "h-10 w-10 p-0 font-bold aria-selected:opacity-100 rounded-xl hover:bg-accent text-foreground flex items-center justify-center transition-all cursor-pointer",
        range_start: "rounded-l-xl bg-[#344837] text-white shadow-xs",
        range_end: "rounded-r-xl bg-[#344837] text-white shadow-xs",
        selected:
          "bg-[#344837] text-white hover:bg-[#273629] hover:text-white focus:bg-[#344837] focus:text-white shadow-xs font-bold",
        today:
          "bg-primary/10 text-primary font-extrabold border-2 border-primary/50",
        outside:
          "day-outside text-muted-foreground/30 opacity-40 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground/30 opacity-40 cursor-not-allowed",
        range_middle:
          "aria-selected:bg-[#344837]/15 aria-selected:text-[#28382b] font-bold rounded-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4 text-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-foreground" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

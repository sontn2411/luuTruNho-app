import { addDays, format, isWeekend, getDay, startOfWeek, isToday } from "date-fns";
import { DayInfo } from "./types";

export function getStartOfCurrentWeek(date: Date = new Date()): Date {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function getDayInfo(date: Date): DayInfo {
  const dayIdx = getDay(date);
  const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return {
    dayNum: format(date, "d"),
    dayLabel: dayLabels[dayIdx],
    isWeekendDay: isWeekend(date),
    isSunday: dayIdx === 0,
    isTodayDate: isToday(date),
  };
}

export { addDays, format, isToday };

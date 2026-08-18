import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingBar() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState("2 khách");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = document.getElementById("quick-booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-[1120px] px-5 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="grid gap-2 rounded-2xl border border-[#e1d8cb] bg-[#faf8f2] p-3 shadow-[0_18px_45px_rgba(53,52,39,0.12)] sm:grid-cols-[1fr_1fr_0.85fr_auto] sm:items-center sm:gap-0 sm:p-2"
      >
        {/* Nhận phòng */}
        <div className="flex items-center gap-3 border-b border-[#e5dfd5] px-4 py-3 sm:border-b-0 sm:border-r">
          <CalendarDays size={17} className="text-secondary" />
          <span className="w-full min-w-0">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8d978e]">
              Nhận phòng
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="mt-0.5 flex h-7 w-full items-center justify-start border-0 bg-transparent p-0 text-[11px] font-bold text-[#33443a] text-left outline-none cursor-pointer"
                >
                  {checkInDate ? (
                    format(checkInDate, "dd/MM/yyyy")
                  ) : (
                    <span className="text-[#8d978e]/70">Chọn ngày nhận</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                />
              </PopoverContent>
            </Popover>
          </span>
        </div>

        {/* Trả phòng */}
        <div className="flex items-center gap-3 border-b border-[#e5dfd5] px-4 py-3 sm:border-b-0 sm:border-r">
          <CalendarDays size={17} className="text-secondary" />
          <span className="w-full min-w-0">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8d978e]">
              Trả phòng
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="mt-0.5 flex h-7 w-full items-center justify-start border-0 bg-transparent p-0 text-[11px] font-bold text-[#33443a] text-left outline-none cursor-pointer"
                >
                  {checkOutDate ? (
                    format(checkOutDate, "dd/MM/yyyy")
                  ) : (
                    <span className="text-[#8d978e]/70">Chọn ngày trả</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  disabled={(date) =>
                    checkInDate ? date < checkInDate : false
                  }
                />
              </PopoverContent>
            </Popover>
          </span>
        </div>

        {/* Số khách */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Users size={17} className="text-secondary" />
          <span className="w-full min-w-0">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8d978e]">
              Số khách
            </span>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="mt-0.5 h-7 border-0 bg-transparent p-0 text-[11px] font-bold text-[#33443a] shadow-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Chọn số khách" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 khách">1 khách</SelectItem>
                <SelectItem value="2 khách">2 khách</SelectItem>
                <SelectItem value="3 khách">3 khách</SelectItem>
                <SelectItem value="4 khách">4 khách</SelectItem>
              </SelectContent>
            </Select>
          </span>
        </div>

        <Button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#3a4a38] px-5 text-[11px] font-extrabold text-white transition-colors hover:bg-[#2c3d2e] sm:rounded-lg"
        >
          Xem phòng <ArrowRight size={15} />
        </Button>
      </form>
    </section>
  );
}

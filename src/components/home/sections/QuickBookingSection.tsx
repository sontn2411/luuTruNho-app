import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rooms } from "../data/homeData";
import { BookingSuccessModal } from "../modals/BookingSuccessModal";

export function QuickBookingSection() {
  const [quickBooking, setQuickBooking] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2 khách",
    room: "Phòng Mây",
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    reference: string;
    submittedAt: string;
  } | null>(null);

  useEffect(() => {
    if (!bookingSuccess) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingSuccess(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [bookingSuccess]);

  function submitQuickBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (bookingSubmitting) return;
    setBookingSubmitting(true);
    window.setTimeout(() => {
      setBookingSubmitting(false);
      setBookingSuccess({
        reference: `LTN-${Date.now().toString().slice(-6)}`,
        submittedAt: new Intl.DateTimeFormat("vi-VN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),
      });
    }, 850);
  }
  return (
    <section id="quick-booking" className="bg-[#e8eadf] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-24 lg:px-10">
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Gửi yêu cầu đặt phòng
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em] text-[#26352b]">
            <span className="block whitespace-nowrap">Một căn phòng</span>
            <em className="block whitespace-nowrap text-[#8f5b3a]">
              đang chờ bạn.
            </em>
          </h2>
          <p className="mb-0 mt-6 max-w-[390px] text-[13px] font-medium leading-7 text-[#78847b]">
            Để lại ngày dự kiến và cách liên hệ. Chúng mình sẽ xem phòng phù hợp
            rồi phản hồi bạn.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8c82]">
            <CalendarDays size={16} className="text-secondary" /> Không cần
            thanh toán ngay
          </div>
        </div>
        <form
          onSubmit={submitQuickBooking}
          className="rounded-3xl border border-[#d7d9ce] bg-[#f8f5ed] p-6 shadow-[0_20px_42px_rgba(61,68,52,0.08)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Tên của bạn
              <Input
                required
                value={quickBooking.name}
                onChange={(event) =>
                  setQuickBooking({
                    ...quickBooking,
                    name: event.target.value,
                  })
                }
                placeholder="Nguyễn An"
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none placeholder:text-[#a1aaa0] focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Số điện thoại
              <Input
                required
                type="tel"
                value={quickBooking.phone}
                onChange={(event) =>
                  setQuickBooking({
                    ...quickBooking,
                    phone: event.target.value,
                  })
                }
                placeholder="09xx xxx xxx"
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none placeholder:text-[#a1aaa0] focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Nhận phòng
              <Input
                required
                type="date"
                value={quickBooking.checkIn}
                onChange={(event) =>
                  setQuickBooking({
                    ...quickBooking,
                    checkIn: event.target.value,
                  })
                }
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Trả phòng
              <Input
                required
                type="date"
                value={quickBooking.checkOut}
                onChange={(event) =>
                  setQuickBooking({
                    ...quickBooking,
                    checkOut: event.target.value,
                  })
                }
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Số khách
              <Select
                value={quickBooking.guests}
                onValueChange={(val) =>
                  setQuickBooking({
                    ...quickBooking,
                    guests: val,
                  })
                }
              >
                <SelectTrigger className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none focus:border-primary">
                  <SelectValue placeholder="Số khách" />
                </SelectTrigger>
                <SelectContent className="border border-[#d8d8cd] bg-[#fcfbf7] text-[#33443a]">
                  <SelectItem value="1 khách">1 khách</SelectItem>
                  <SelectItem value="2 khách">2 khách</SelectItem>
                  <SelectItem value="3 khách">3 khách</SelectItem>
                  <SelectItem value="4 khách">4 khách</SelectItem>
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Loại phòng
              <Select
                value={quickBooking.room}
                onValueChange={(val) =>
                  setQuickBooking({
                    ...quickBooking,
                    room: val,
                  })
                }
              >
                <SelectTrigger className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f3f0e8] px-3 text-[12px] font-bold text-[#33443a] outline-none shadow-none focus:border-primary">
                  <SelectValue placeholder="Chọn phòng" />
                </SelectTrigger>
                <SelectContent className="border border-[#d8d8cd] bg-[#fcfbf7] text-[#33443a]">
                  {rooms.map((room) => (
                    <SelectItem key={room.name} value={room.name}>
                      {room.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Chưa biết, cần tư vấn">
                    Chưa biết, cần tư vấn
                  </SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
          <button
            type="submit"
            disabled={bookingSubmitting}
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#3a4a38] text-[11px] font-extrabold text-white transition-all hover:bg-[#2c3d2e] disabled:cursor-wait disabled:opacity-75"
          >
            {bookingSubmitting ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />{" "}
                Đang gửi yêu cầu...
              </>
            ) : (
              <>
                Gửi yêu cầu đặt phòng <ArrowRight size={15} />
              </>
            )}
          </button>
          <p className="mb-0 mt-4 text-center text-[10px] font-medium leading-5 text-[#89948a]">
            Thông tin của bạn chỉ được dùng để phản hồi yêu cầu đặt phòng.
          </p>
        </form>
      </div>

      <BookingSuccessModal
        bookingSuccess={bookingSuccess}
        onClose={() => setBookingSuccess(null)}
        quickBooking={quickBooking}
      />
    </section>
  );
}

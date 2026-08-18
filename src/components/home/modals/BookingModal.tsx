import { FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";

interface BookingState {
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  booking,
  setBooking,
  onSubmit,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#24362b]/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-5">
      <div className="w-full max-w-[520px] rounded-t-2xl border border-[#dddcd3] bg-[#fbfaf4] p-5 shadow-2xl sm:rounded-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-secondary">
              Tìm căn phòng cho ngày của bạn
            </p>
            <h2 className="m-0 font-display text-[32px] font-normal tracking-[-0.04em] text-[#26352b]">
              Mình đi lúc nào nhỉ?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full border border-[#d8d8cd] text-[#718076] hover:border-secondary hover:text-secondary"
            aria-label="Đóng"
          >
            <X size={17} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Nhận phòng
              <input
                required
                type="date"
                value={booking.checkIn}
                onChange={(event) =>
                  setBooking({ ...booking, checkIn: event.target.value })
                }
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f5f3eb] px-3 text-[12px] font-bold text-[#33443a] outline-none focus:border-primary"
              />
            </label>
            <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
              Trả phòng
              <input
                required
                type="date"
                value={booking.checkOut}
                onChange={(event) =>
                  setBooking({ ...booking, checkOut: event.target.value })
                }
                className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f5f3eb] px-3 text-[12px] font-bold text-[#33443a] outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="grid gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#77847b]">
            Số khách
            <select
              value={booking.guests}
              onChange={(event) =>
                setBooking({ ...booking, guests: event.target.value })
              }
              className="h-11 rounded-lg border border-[#d8d8cd] bg-[#f5f3eb] px-3 text-[12px] font-bold text-[#33443a] outline-none focus:border-primary"
            >
              <option>1 khách</option>
              <option>2 khách</option>
              <option>3 khách</option>
              <option>4 khách</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg bg-[#3a4a38] text-[11px] font-extrabold text-white hover:bg-[#2c3d2e]"
          >
            Kiểm tra phòng trống <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

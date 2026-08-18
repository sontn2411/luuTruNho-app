import { ArrowRight, Check, X } from "lucide-react";
import { formatBookingDate } from "../data/homeData";

interface BookingSuccessData {
  reference: string;
  submittedAt: string;
}

interface QuickBookingData {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
}

interface BookingSuccessModalProps {
  bookingSuccess: BookingSuccessData | null;
  onClose: () => void;
  quickBooking: QuickBookingData;
}

export function BookingSuccessModal({
  bookingSuccess,
  onClose,
  quickBooking,
}: BookingSuccessModalProps) {
  if (!bookingSuccess) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#142119]/70 p-4 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      aria-label="Xác nhận đặt phòng"
    >
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-[3px_3px_32%_3px] border border-[#e1d8cb] bg-[#fbfaf4] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:p-8">
        <div className="absolute -right-16 -top-16 size-44 rounded-full border border-[#d9b291]/45" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-[#d8d8cd] text-[#718076] transition-colors hover:border-secondary hover:text-secondary"
          aria-label="Đóng xác nhận"
        >
          <X size={17} />
        </button>
        <div className="relative">
          <div className="grid size-12 place-items-center rounded-full bg-[#e1ecdf] text-[#3a4a38]">
            <Check size={24} />
          </div>
          <p className="mb-2 mt-6 text-[10px] font-extrabold uppercase tracking-[0.17em] text-secondary">
            Đã nhận yêu cầu đặt phòng
          </p>
          <h2 className="m-0 max-w-[400px] font-display text-[36px] font-normal leading-[0.95] tracking-[-0.04em] text-[#26352b]">
            Cảm ơn {quickBooking.name || "bạn"},<br />
            <em className="text-[#8f5b3a]">mình đã ghi lại rồi.</em>
          </h2>
          <p className="mb-0 mt-5 max-w-[420px] text-[12px] font-medium leading-6 text-[#78847b]">
            Đây là yêu cầu frontend demo. Đội ngũ sẽ dùng thông tin bên dưới để
            kiểm tra và phản hồi lại cho bạn.
          </p>
          <div className="mt-7 grid gap-3 rounded-xl border border-[#dedbd1] bg-[#f3f0e8] p-4 sm:grid-cols-2">
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Mã yêu cầu
              </span>
              <span className="mt-1 block text-[13px] font-extrabold text-[#3a4a38]">
                {bookingSuccess.reference}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Thời gian gửi
              </span>
              <span className="mt-1 block text-[11px] font-bold text-[#33443a]">
                {bookingSuccess.submittedAt}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Lịch lưu trú
              </span>
              <span className="mt-1 block text-[11px] font-bold text-[#33443a]">
                {formatBookingDate(quickBooking.checkIn)} →{" "}
                {formatBookingDate(quickBooking.checkOut)}
              </span>
            </div>
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Phòng & khách
              </span>
              <span className="mt-1 block text-[11px] font-bold text-[#33443a]">
                {quickBooking.room} · {quickBooking.guests}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Liên hệ
              </span>
              <span className="mt-1 block text-[11px] font-bold text-[#33443a]">
                {quickBooking.phone}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#3a4a38] text-[11px] font-extrabold text-white transition-colors hover:bg-[#2c3d2e]"
          >
            Đóng xác nhận <ArrowRight size={15} />
          </button>
          <p className="mb-0 mt-3 text-center text-[10px] font-medium text-[#89948a]">
            Nhấn Escape hoặc nút đóng để trở về trang.
          </p>
        </div>
      </div>
    </div>
  );
}

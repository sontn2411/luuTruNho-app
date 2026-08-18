import { ArrowRight } from "lucide-react";

interface ContactBannerProps {
  onOpenBooking: () => void;
}

export function ContactBanner({ onOpenBooking }: ContactBannerProps) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#3a4a38] py-24 text-white sm:py-28"
    >
      <div className="absolute -right-20 top-[-100px] size-[420px] rounded-full border border-white/10" />
      <div className="absolute -right-4 top-[-35px] size-[290px] rounded-full border border-[#d9b291]/20" />
      <div className="relative mx-auto flex max-w-[1280px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10">
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#d9b291]">
            Khi bạn muốn đi đâu đó
          </p>
          <h2 className="m-0 font-display text-[clamp(38px,4.8vw,68px)] font-normal leading-[1.15] tracking-[-0.05em]">
            <span className="block whitespace-nowrap">Chừa một khoảng</span>
            <em className="block whitespace-nowrap text-[#d9b291]">
              cho mình.
            </em>
          </h2>
          <p className="mb-0 mt-6 max-w-[410px] text-[13px] font-medium leading-6 text-white/68">
            Gửi ngày bạn muốn đến. Chúng mình sẽ cùng bạn tìm một căn phòng thật vừa.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenBooking}
          className="group flex h-12 items-center gap-4 self-start rounded-full bg-[#d9b291] px-5 pl-6 text-[11px] font-extrabold text-[#3a4a38] transition-colors hover:bg-[#efc9aa] lg:self-end"
        >
          Kiểm tra phòng trống{" "}
          <span className="grid size-8 place-items-center rounded-full bg-[#3a4a38] text-white">
            <ArrowRight size={15} />
          </span>
        </button>
      </div>
    </section>
  );
}

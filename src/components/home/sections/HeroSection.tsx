import Image from "next/image";
import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { HERO_IMAGE, ROOM_IMAGE, ScrollLink } from "../data/homeData";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative min-h-[690px] overflow-hidden bg-[#263a2c] text-white sm:min-h-[760px]"
    >
      <Image
        src={HERO_IMAGE}
        alt="Hiên nhà xanh mát của Lưu Trú Nhỏ"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#152218]/95 via-[#2f4935]/72 to-[#2f4935]/16" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#172218]/80 via-transparent to-[#102014]/30" />
      <div className="relative mx-auto flex min-h-[690px] max-w-[1280px] flex-col justify-center px-5 pb-16 pt-32 sm:min-h-[760px] sm:px-8 lg:px-10">
        <div className="max-w-[720px] animate-[rise-in_650ms_var(--ease-out)_both]">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#e1b995]">
            <span className="h-px w-9 bg-[#d9b291]" /> Một chỗ ở có nhịp riêng
          </div>
          <h1 className="m-0 max-w-[760px] font-display text-[clamp(54px,8vw,104px)] font-normal leading-[1.1] tracking-[-0.055em]">
            Ở chậm lại,
            <br />
            <em className="text-[#deb99b]">thấy nhiều hơn</em>
          </h1>
          <p className="mb-0 mt-8 max-w-[450px] text-[14px] font-medium leading-7 text-white/76 sm:text-[16px]">
            Một homestay nhỏ cho những ngày cần một hiên nhà, một căn phòng yên
            và một khoảng thở thật vừa vặn.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="group flex h-12 items-center gap-4 rounded-full bg-[#d9b291] px-5 pl-6 text-[11px] font-extrabold text-[#3a4a38] shadow-[0_12px_30px_rgba(22,35,22,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#efc9aa]"
            >
              Tìm phòng phù hợp{" "}
              <span className="grid size-8 place-items-center rounded-full bg-[#3a4a38] text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </button>
            <ScrollLink href="#story">
              <span className="flex h-12 items-center gap-2 rounded-full border border-white/30 px-5 text-[11px] font-extrabold text-white transition-colors hover:bg-white/10">
                Xem câu chuyện <MoveUpRight size={14} />
              </span>
            </ScrollLink>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between gap-6 pt-20">
          <div className="hidden items-center gap-3 text-[10px] font-bold text-white/65 sm:flex">
            <span className="h-px w-8 bg-[#d9b291]" /> Gần gũi như một căn nhà
            quen
          </div>
          <div className="ml-auto flex max-w-72 items-center gap-3 text-right text-[10px] font-bold leading-4 text-white/62">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#d9b291]/55 text-[#e5bd9f]">
              <Check size={14} />
            </span>
            <span>Được chăm chút cho những ngày ở dễ chịu</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[42px] right-[8%] hidden aspect-[0.78] w-[150px] rotate-[5deg] border border-white/50 bg-[#293a2d]/65 p-1.5 shadow-[0_18px_48px_rgba(17,25,17,0.3)] md:block">
        <Image
          src={ROOM_IMAGE}
          alt="Góc phòng có ánh nắng"
          width={150}
          height={192}
          className="h-[calc(100%_-_22px)] w-full object-cover"
        />
        <div className="flex h-[22px] items-center gap-1.5 text-[7px] font-extrabold uppercase tracking-[0.08em] text-white/75">
          <span className="size-1.5 rounded-full bg-[#d9b291]" /> Góc hiên hôm
          nay
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import { HERO_IMAGE, ROOM_IMAGE } from "../data/homeData";

interface MomentsSectionProps {
  onOpenBooking: () => void;
}

export function MomentsSection({ onOpenBooking }: MomentsSectionProps) {
  return (
    <section id="moments" className="bg-[#26352b] py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20 lg:px-10">
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#d9b291]">
            Những khoảnh khắc ở lại
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em]">
            <span className="block whitespace-nowrap">Có những ngày</span>
            <em className="block whitespace-nowrap text-[#d9b291]">
              không cần đi đâu
            </em>
          </h2>
          <p className="mb-0 mt-7 max-w-[390px] text-[13px] font-medium leading-7 text-white/66">
            Ở Lưu Trú Nhỏ, căn phòng không chỉ là nơi để ngủ. Đó là nơi bạn nghe
            rõ hơn tiếng mưa, ánh nắng và cả nhịp thở của mình.
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="mt-8 flex items-center gap-3 rounded-full border border-[#d9b291]/55 bg-transparent px-5 py-3 text-[10px] font-extrabold text-[#f0c5a4] transition-colors hover:bg-[#d9b291] hover:text-[#26352b]"
          >
            Tìm một căn phòng cho ngày đó <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-4 sm:gap-6">
          <div className="relative">
            <Image
              src={ROOM_IMAGE}
              alt="Một buổi chiều yên trong phòng"
              width={500}
              height={580}
              className="aspect-[0.86] w-full rounded-[3px_3px_42%_3px] object-cover"
            />
            <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white">
              <span className="size-1.5 rounded-full bg-[#d9b291]" /> Một buổi
              chiều yên
            </span>
          </div>
          <div className="mb-[12%] space-y-4">
            <Image
              src={HERO_IMAGE}
              alt="Khoảng hiên xanh vào buổi tối"
              width={400}
              height={440}
              className="aspect-[0.9] w-full rounded-[3px_42%_3px_3px] object-cover"
            />
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center gap-2 text-[#d9b291]">
                <Clock3 size={15} />
                <span className="text-[9px] font-extrabold uppercase tracking-[0.12em]">
                  Một nhịp ở khác
                </span>
              </div>
              <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-white/58">
                Sáng mở rèm, chiều trở về, tối ngồi lại bên hiên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

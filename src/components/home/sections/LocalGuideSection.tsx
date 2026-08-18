import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import { localGuide } from "../data/homeData";

export function LocalGuideSection() {
  return (
    <section id="explore" className="bg-[#f8f5ed] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[620px]">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
              Gợi ý quanh homestay
            </p>
            <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em] text-[#26352b]">
              <span className="block whitespace-nowrap">Ra ngoài một chút,</span>
              <em className="block whitespace-nowrap text-[#8f5b3a]">
                thấy nơi này rõ hơn
              </em>
            </h2>
            <p className="mb-0 mt-6 max-w-[470px] text-[13px] font-medium leading-7 text-[#78847b]">
              Những gợi ý dưới đây là một local guide mở — bạn có thể thay bằng
              địa điểm thật quanh homestay khi chốt khu vực hoạt động.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8c82]">
            <span className="h-px w-8 bg-secondary" /> Những ngày có thêm chuyện
            để kể
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {localGuide.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group overflow-hidden   bg-[#e8eadf]"
              >
                <button
                  type="button"
                  className="relative block aspect-[1.12] w-full overflow-hidden text-left"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f3025]/65 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.11em] text-white">
                    <Icon size={13} /> {item.label}
                  </span>
                  <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-[#faf8f2]/85 text-[#3a4a38] opacity-0 transition-opacity group-hover:opacity-100">
                    <MoveUpRight size={14} />
                  </span>
                </button>
                <div className="p-5">
                  <h3 className="m-0 font-display text-[26px] font-normal text-[#26352b]">
                    {item.title}
                  </h3>
                  <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-[#78847b]">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

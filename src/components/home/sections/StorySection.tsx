import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ROOM_IMAGE, WINDOW_ART } from "../data/homeData";

export function StorySection() {
  return (
    <section
      id="story"
      className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-24 lg:px-10"
    >
      <div>
        <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
          Một nơi để trở về
        </p>
        <h2 className="m-0 max-w-[640px] font-display text-[clamp(42px,5vw,70px)] font-normal leading-[1.05] tracking-[-0.05em] text-[#26352b]">
          <span className="whitespace-nowrap">Không cần nhiều,</span>
          <br />
          <em className="text-[#8f5b3a]">chỉ cần đúng</em>
        </h2>
        <p className="mb-0 mt-7 max-w-[425px] text-[14px] font-medium leading-7 text-[#6f7a71]">
          Lưu Trú Nhỏ bắt đầu từ mong muốn tạo ra một chỗ ở tử tế: đủ riêng để
          nghỉ ngơi, đủ gần để không thấy xa lạ, và đủ chỉn chu để bạn có thể
          thả lỏng.
        </p>
        <button
          type="button"
          className="mt-8 flex items-center gap-3 border-0 bg-transparent p-0 text-[11px] font-extrabold text-[#3a4a38] hover:text-secondary"
        >
          Đọc câu chuyện của chúng mình{" "}
          <span className="grid size-7 place-items-center rounded-full border border-[#b8c5b7]">
            <ArrowRight size={13} />
          </span>
        </button>
      </div>
      <div className="relative min-h-[390px]">
        <div className="absolute inset-x-[12%] top-[8%] h-[76%] rounded-[48%_48%_4px_4px] bg-[#dfe5d8]" />
        <div className="relative grid h-[390px] grid-cols-[1.1fr_0.9fr] items-end gap-4 sm:h-[480px] sm:gap-6">
          <Image
            src={ROOM_IMAGE}
            alt="Không gian phòng ấm cúng"
            width={600}
            height={500}
            className="h-[83%] w-full rounded-[3px_3px_45%_3px] object-cover shadow-[0_22px_35px_rgba(54,58,43,0.12)]"
          />
          <div className="mb-[12%] flex flex-col gap-4">
            <Image
              src={WINDOW_ART}
              alt="Ô cửa và góc nhỏ có nắng"
              width={400}
              height={300}
              className="h-[190px] w-full rounded-[3px_45%_3px_3px] object-cover shadow-[0_18px_32px_rgba(54,58,43,0.12)] sm:h-[260px]"
            />
            <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#7f8c82]">
              <span className="h-px w-7 bg-secondary" /> Hiên, nắng, và cây xanh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import {
  LOGO_IMAGE,
  galleryItems,
} from "../data/homeData";
import { LightboxModal } from "../modals/LightboxModal";

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight")
        setLightboxIndex((current) =>
          current === null ? 0 : (current + 1) % galleryItems.length,
        );
      if (event.key === "ArrowLeft")
        setLightboxIndex((current) =>
          current === null
            ? 0
            : (current - 1 + galleryItems.length) % galleryItems.length,
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);
  return (
    <section id="gallery" className="bg-[#f8f5ed] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[620px]">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
              Nhìn kỹ hơn một chút
            </p>
            <h2 className="m-0 font-display text-[clamp(42px,5vw,70px)] font-normal leading-[1.1] tracking-[-0.05em] text-[#26352b]">
              Những góc nhỏ
              <br />
              <em className="text-[#8f5b3a]">để nhớ</em>
            </h2>
            <p className="mb-0 mt-6 max-w-[440px] text-[13px] font-medium leading-7 text-[#78847b]">
              Một chiếc ghế ngoài hiên, một bữa sáng bên cửa sổ, một mảng nắng
              trên ga giường. Hãy nhìn quanh trước khi chọn nơi mình sẽ ở.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8c82]">
            <span className="h-px w-8 bg-secondary" /> Chất liệu của một kỳ nghỉ
          </div>
        </div>
        <div
          className="marketing-gallery flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 sm:grid sm:overflow-visible sm:grid-cols-12 sm:grid-rows-[190px_250px_175px] sm:pb-0"
          role="region"
          aria-label="Thư viện ảnh homestay"
        >
          {galleryItems.map((item, index) => (
            <figure
              key={item.caption}
              className={`group relative min-w-[82vw] snap-start overflow-hidden sm:min-w-0 ${item.className}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="absolute inset-0 z-10 size-full cursor-zoom-in text-left"
                aria-label={`Phóng to ảnh: ${item.caption}`}
              >
                <span className="sr-only">Mở ảnh {item.caption}</span>
              </button>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 82vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#1b2a20]/70 to-transparent p-5 pt-16 text-white">
                <span>
                  <span className="block text-[11px] font-extrabold">
                    {item.caption}
                  </span>
                  <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.11em] text-white/65">
                    {item.category}
                  </span>
                </span>
                <span className="font-display text-[20px] text-[#e7bd9c]">
                  {item.number}
                </span>
              </figcaption>
              <span className="pointer-events-none absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#faf8f2]/85 text-[#3a4a38] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <MoveUpRight size={15} />
              </span>
            </figure>
          ))}
          <div className="flex min-w-[82vw] snap-start items-center justify-between rounded-2xl bg-[#e8eadf] px-6 py-6 sm:col-span-7 sm:min-w-0">
            <div>
              <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.14em] text-secondary">
                Lưu Trú Nhỏ
              </p>
              <p className="mb-0 max-w-[230px] font-display text-[23px] leading-tight text-[#26352b]">
                Ở lâu hơn trong những điều vừa đủ.
              </p>
            </div>
            <Image
              src={LOGO_IMAGE}
              alt="Logo"
              width={64}
              height={64}
              className="size-16 object-contain opacity-50"
            />
          </div>
        </div>
        <p className="mt-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#88978e] sm:hidden">
          <span className="h-px w-6 bg-secondary" /> Vuốt ngang để xem thêm
        </p>
      </div>

      <LightboxModal
        lightboxIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        visibleGallery={galleryItems}
        setLightboxIndex={setLightboxIndex}
      />
    </section>
  );
}

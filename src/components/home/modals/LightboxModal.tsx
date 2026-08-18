import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { type GalleryItem } from "../data/homeData";

interface LightboxModalProps {
  lightboxIndex: number | null;
  onClose: () => void;
  visibleGallery: GalleryItem[];
  setLightboxIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export function LightboxModal({
  lightboxIndex,
  onClose,
  visibleGallery,
  setLightboxIndex,
}: LightboxModalProps) {
  if (lightboxIndex === null || !visibleGallery[lightboxIndex]) return null;

  const currentItem = visibleGallery[lightboxIndex];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#142119]/90 p-4 backdrop-blur-[5px] sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh gallery"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#26352b] sm:right-7 sm:top-7"
        aria-label="Đóng ảnh"
      >
        <X size={19} />
      </button>
      <button
        type="button"
        onClick={() =>
          setLightboxIndex((current) =>
            current === null
              ? 0
              : (current - 1 + visibleGallery.length) % visibleGallery.length,
          )
        }
        className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#26352b] sm:left-7"
        aria-label="Ảnh trước"
      >
        <ChevronLeft size={21} />
      </button>
      <figure className="flex max-h-[90vh] w-full max-w-[1040px] flex-col items-center gap-4">
        <Image
          src={currentItem.src}
          alt={currentItem.alt}
          width={1000}
          height={750}
          className="max-h-[76vh] w-auto max-w-full rounded-[3px_34%_3px_3px] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        />
        <figcaption className="flex w-full max-w-[780px] items-center justify-between gap-5 text-white">
          <div>
            <span className="block font-display text-[26px]">
              {currentItem.caption}
            </span>
            <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#d9b291]">
              {currentItem.category} · {lightboxIndex + 1} / {visibleGallery.length}
            </span>
          </div>
          <span className="hidden max-w-[190px] text-right text-[10px] font-medium leading-5 text-white/60 sm:block">
            Dùng phím mũi tên để xem ảnh tiếp theo
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={() =>
          setLightboxIndex((current) =>
            current === null ? 0 : (current + 1) % visibleGallery.length,
          )
        }
        className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white hover:text-[#26352b] sm:right-7"
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight size={21} />
      </button>
    </div>
  );
}

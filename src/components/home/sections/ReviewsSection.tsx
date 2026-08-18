import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { mockReviews } from "../data/homeData";

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  const goToReview = useCallback((newIndex: number) => {
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeState("in");
    }, 280);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToReview((currentIndex + 1) % mockReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, goToReview]);

  const currentReview = mockReviews[currentIndex];

  return (
    <section id="reviews" className="bg-[#e8eadf] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-24 lg:px-10">
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Chia sẻ sau kỳ ở
          </p>
          <h2 className="m-0 max-w-[470px] font-display text-[clamp(42px,5vw,68px)] font-normal leading-[0.9] tracking-[-0.05em] text-[#26352b]">
            Lời thật,
            <br />
            <em className="text-[#8f5b3a]">khi đã có đủ.</em>
          </h2>
          <p className="mb-0 mt-6 max-w-[380px] text-[13px] font-medium leading-7 text-[#78847b]">
            Chúng mình chỉ hiển thị những chia sẻ đến từ khách đã thật sự lưu
            trú, để mỗi lời nhận xét đều có nguồn rõ ràng và đáng tin.
          </p>
        </div>
        <div className="relative flex h-[310px] sm:h-[330px] flex-col justify-between overflow-hidden rounded-[3px_42%_3px_3px] border border-[#cfd5c8] bg-[#f8f5ed] p-7 sm:p-10">
          <div className="absolute -right-10 -top-10 size-36 rounded-full border border-[#d9b291]/35" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[#3a4a38] text-[#d9b291]">
                  <MessageCircle size={17} />
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#7f8c82]">
                  Đánh giá đã xác minh
                </span>
              </div>
              <div className="flex items-center gap-1.5 pr-8 md:pr-10">
                {mockReviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (idx !== currentIndex && fadeState === "in") {
                        goToReview(idx);
                      }
                    }}
                    aria-label={`Xem đánh giá ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-5 bg-[#3a4a38]"
                        : "w-1.5 bg-[#cfd5c8] hover:bg-[#8d978e]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className={`my-auto transition-all duration-300 cubic-bezier(0.23,1,0.32,1) ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-3 scale-[0.985]"
              }`}
            >
              <p className="mb-0 max-w-[460px] text-[14px] sm:text-[16px] font-medium leading-relaxed text-[#26352b] line-clamp-4">
                &ldquo;{currentReview.desc}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-[#e2e4d8] pt-4">
              <div
                className={`flex items-center gap-3 transition-all duration-300 ease-out ${
                  fadeState === "in"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <div className="relative size-9 overflow-hidden rounded-full border border-[#cfd5c8] bg-[#e8eadf]">
                  <Image
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-0 text-[12px] font-bold text-[#26352b]">
                    {currentReview.name}
                  </p>
                  <p className="mb-0 text-[10px] font-medium text-[#8d978e]">
                    {currentReview.date}
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 text-[#d98e32] transition-all duration-300 ease-out ${
                  fadeState === "in"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

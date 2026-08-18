import { useEffect, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
import { dayMoments } from "../data/homeData";

export function DayMomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="day"
      className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Một ngày ở Lưu Trú Nhỏ
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em]">
            <span className="block whitespace-nowrap">Không lịch trình</span>
            <em className="block whitespace-nowrap text-[#8f5b3a]">
              vẫn đủ đầy
            </em>
          </h2>
          <p className="mb-0 mt-7 max-w-[390px] text-[13px] font-medium leading-7 text-[#78847b]">
            Có những ngày mình đi thật xa. Cũng có những ngày chỉ cần ở yên và
            nhận ra từng khoảng thời gian đều có một vẻ đẹp riêng.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8c82]">
            <Clock3 size={16} className="text-secondary" /> Nhịp ở do bạn chọn
          </div>
        </div>
        <div className="divide-y divide-[#d8d8cc] border-y border-[#d8d8cc]">
          {dayMoments.map((moment, index) => (
            <article
              key={moment.time}
              style={{
                transitionDelay: `${index * 140 + 100}ms`,
              }}
              className={`group grid gap-3 py-6 transition-all hover:cursor-default duration-700 ease-out sm:grid-cols-[90px_1fr_auto] sm:items-start sm:gap-6 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="font-display text-[24px] text-secondary">
                {moment.time}
              </span>
              <div>
                <h3 className="m-0 font-display text-[26px] font-normal text-[#26352b] transition-colors duration-300 group-hover:text-[#8f5b3a]">
                  {moment.title}
                </h3>
                <p className="mb-0 mt-2 max-w-[430px] text-[12px] font-medium leading-6 text-[#78847b]">
                  {moment.text}
                </p>
              </div>
              <span className="hidden select-none font-display text-[44px] font-normal leading-none text-[#26352b]/20 transition-all duration-300 group-hover:text-[#8f5b3a]/45 group-hover:scale-105 sm:block">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

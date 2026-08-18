import { nearbyRhythms } from "../data/homeData";

export function NearbyRhythmsSection() {
  return (
    <section id="nearby" className="bg-[#e8eadf] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-[620px]">
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Gợi ý quanh nhà
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em] text-[#26352b]">
            <span className="block whitespace-nowrap">Bước ra khỏi hiên,</span>
            <em className="block whitespace-nowrap text-[#8f5b3a]">
              ngày mở ra
            </em>
          </h2>
          <p className="mb-0 mt-6 text-[13px] font-medium leading-7 text-[#78847b]">
            Bạn không cần một danh sách dài. Chỉ vài gợi ý vừa đủ để nhìn khu
            phố bằng đôi mắt của người đang nghỉ.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {nearbyRhythms.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="border-t border-[#c9cfc2] pt-5"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={21}
                    className="text-secondary"
                    strokeWidth={1.5}
                  />
                  <span className="font-display text-[20px] text-[#a8b2a5]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[27px] font-normal text-[#26352b]">
                  {item.title}
                </h3>
                <p className="mb-0 mt-2 text-[12px] font-medium leading-6 text-[#78847b]">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

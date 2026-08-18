import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs } from "../data/homeData";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="bg-[#f8f5ed] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24 lg:px-10">
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Hỏi trước khi đến
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em]">
            <span className="block whitespace-nowrap">Mọi thứ rõ ràng,</span>
            <em className="block whitespace-nowrap text-[#8f5b3a]">
              để lòng nhẹ hơn.
            </em>
          </h2>
          <div className="mt-8 flex items-center gap-3 text-[11px] font-bold text-[#78847b]">
            <MessageCircle size={17} className="text-secondary" /> Chưa thấy câu
            trả lời?{" "}
            <button
              type="button"
              className="border-0 bg-transparent p-0 font-extrabold text-[#3a4a38] hover:text-secondary"
            >
              Nhắn cho chúng mình
            </button>
          </div>
        </div>
        <div className="divide-y divide-[#d9d6ca] border-y border-[#d9d6ca]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="text-[13px] font-extrabold text-[#33443a]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0 pb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[600px] pr-8 text-[12px] font-medium leading-6 text-[#78847b]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

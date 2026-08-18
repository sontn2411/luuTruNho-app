import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveUpRight } from "lucide-react";
import { rooms } from "../data/homeData";

interface RoomsSectionProps {
  onOpenBooking: () => void;
}

export function RoomsSection({ onOpenBooking }: RoomsSectionProps) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  const currentRooms = rooms.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage,
  );

  function handlePrev() {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }

  function handleNext() {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }

  return (
    <section id="stay" className="bg-[#e8eadf] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
              Chọn một góc cho mình
            </p>
            <h2 className="m-0 font-display text-[clamp(42px,5vw,68px)] font-normal leading-[1] tracking-[-0.05em] text-[#26352b]">
              Những căn phòng
              <br />
              <em className="text-[#8f5b3a]">có ánh sáng riêng</em>
            </h2>
          </div>
          <div className="flex items-center gap-6 self-start sm:self-end">
            <button
              type="button"
              onClick={onOpenBooking}
              className="flex items-center gap-2 border-0 bg-transparent p-0 text-[11px] font-extrabold text-[#3a4a38] hover:text-secondary"
            >
              Xem lịch phòng <MoveUpRight size={15} />
            </button>

            {/* Bộ điều hướng trang trên Header */}
            {totalPages > 1 && (
              <div className="flex items-center gap-3 border-l border-[#cfd7cb] pl-5">
                <span className="font-display text-[13px] font-bold text-[#3a4a38]">
                  0{page + 1}{" "}
                  <span className="text-[11px] font-normal text-[#8d978e]">
                    / 0{totalPages}
                  </span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Trang phòng trước"
                    className="group grid size-8 place-items-center rounded-full border border-[#c4cfc2] bg-[#faf8f2] text-[#3a4a38] shadow-xs transition-all hover:border-[#3a4a38] hover:bg-[#3a4a38] hover:text-white active:scale-95"
                  >
                    <ChevronLeft
                      size={15}
                      className="transition-transform group-hover:-translate-x-0.5"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Trang phòng tiếp theo"
                    className="group grid size-8 place-items-center rounded-full border border-[#c4cfc2] bg-[#faf8f2] text-[#3a4a38] shadow-xs transition-all hover:border-[#3a4a38] hover:bg-[#3a4a38] hover:text-white active:scale-95"
                  >
                    <ChevronRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Container với Nút Nổi 2 Bên */}
        <div className="relative px-1 sm:px-3">
          {/* Lưới 3 phòng hiển thị theo trang */}
          <div key={page} className="grid gap-5 md:grid-cols-3">
            {currentRooms.map((room, index) => (
              <article
                key={`${page}-${room.name}`}
                style={{ animationDelay: `${index * 110}ms` }}
                className="group animate-[rise-in_600ms_var(--ease-out)_both]"
              >
                <div className="relative overflow-hidden rounded-[3px] bg-[#d6ddd1]">
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={450}
                    height={500}
                    className="aspect-[0.92] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d2a20]/55 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#faf8f2]/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#3a4a38]">
                    {room.type}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-[#d9b291] text-[#3a4a38] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-label={`Xem ${room.name}`}
                  >
                    <MoveUpRight size={16} />
                  </button>
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <h3 className="m-0 font-display text-[28px] font-normal tracking-[-0.035em] text-[#26352b]">
                      {room.name}
                    </h3>
                    <p className="mb-0 mt-1.5 max-w-[230px] text-[11px] font-medium leading-5 text-[#78847b]">
                      {room.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-right text-[11px] font-extrabold text-secondary">
                    <span className="block text-[9px] font-semibold text-[#8d978e]">
                      từ
                    </span>
                    {room.price}
                    <span className="block text-[9px] font-semibold text-[#8d978e]">
                      / đêm
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

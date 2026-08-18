import { useState } from "react";
import { MapPin } from "lucide-react";
import { demoPlaces } from "../data/homeData";

export function InteractiveMapSection() {
  const [selectedPlaceId, setSelectedPlaceId] = useState("stay");
  const selectedPlace =
    demoPlaces.find((place) => place.id === selectedPlaceId) ?? demoPlaces[0];
  return (
    <section id="map" className="bg-[#e8eadf] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[620px]">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
              Gợi ý trên bản đồ
            </p>
            <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em] text-[#26352b]">
              <span className="block whitespace-nowrap">Ở một nơi,</span>
              <em className="block whitespace-nowrap text-[#8f5b3a]">
                chạm được nhiều điều
              </em>
            </h2>
            <p className="mb-0 mt-6 max-w-[460px] text-[13px] font-medium leading-7 text-[#78847b]">
              Bản đồ demo tại Hội An giúp bạn hình dung nhịp đi lại giữa Lưu Trú
              Nhỏ và những điểm khám phá quanh nhà.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8c82]">
            <span className="h-px w-8 bg-secondary" /> Vị trí minh họa · có thể
            thay bằng địa chỉ thật
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="relative overflow-hidden rounded-[3px_3px_34%_3px] border border-[#d2d8cd] bg-[#dfe5d8] p-2 shadow-[0_18px_42px_rgba(61,68,52,0.1)]">
            <div className="flex h-[430px] items-center justify-center rounded-[3px_3px_27%_3px] bg-[#d5dccf] text-xs font-semibold text-[#5c695b] sm:h-[520px]">
              <div className="text-center">
                <MapPin className="mx-auto mb-2 text-primary" size={28} />
                <p className="font-bold text-[#26352b]">
                  {selectedPlace.title}
                </p>
                <p className="text-[11px] text-[#69756c]">
                  {selectedPlace.description}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[3px_34%_3px_3px] border border-[#d2d8cd] bg-[#f8f5ed] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-secondary">
                  Khám phá quanh nhà
                </p>
                <h3 className="m-0 font-display text-[27px] font-normal text-[#26352b]">
                  Chọn một điểm
                </h3>
              </div>
              <MapPin size={18} className="text-secondary" />
            </div>
            <div className="space-y-1.5">
              {demoPlaces.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => setSelectedPlaceId(place.id)}
                  className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${selectedPlaceId === place.id ? "bg-[#e5ece2]" : "hover:bg-[#f1eee6]"}`}
                >
                  <span
                    className="mt-1 grid size-7 shrink-0 place-items-center rounded-full text-white"
                    style={{ backgroundColor: place.accent }}
                  >
                    <MapPin size={13} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-extrabold text-[#33443a]">
                        {place.title}
                      </span>
                      <span className="shrink-0 text-[9px] font-bold text-secondary">
                        {place.distance}
                      </span>
                    </span>
                    <span className="mt-1 block text-[10px] leading-4 text-[#7d887e]">
                      {place.category}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 border-t border-[#d9d6ca] pt-4">
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#8d978e]">
                Đang chọn
              </span>
              <span className="mt-1 block font-display text-[23px] text-[#26352b]">
                {selectedPlace.title}
              </span>
              <p className="mb-0 mt-1 text-[10px] leading-5 text-[#78847b]">
                {selectedPlace.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

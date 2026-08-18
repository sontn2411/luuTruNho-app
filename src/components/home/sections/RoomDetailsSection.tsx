import Image from "next/image";
import { BedDouble, Sparkles, Sun, Wifi } from "lucide-react";
import { WINDOW_ART } from "../data/homeData";

export function RoomDetailsSection() {
  return (
    <section
      id="details"
      className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-24">
        <div className="relative min-h-[430px]">
          <div className="absolute inset-x-[8%] top-[6%] h-[78%] rounded-[48%_48%_4px_4px] bg-[#e3e6d9]" />
          <Image
            src={WINDOW_ART}
            alt="Chi tiết ô cửa đặc trưng của Lưu Trú Nhỏ"
            width={450}
            height={500}
            className="relative ml-[10%] h-[330px] w-[72%] rounded-[3px_42%_3px_3px] object-cover shadow-[0_24px_35px_rgba(54,58,43,0.12)] sm:h-[410px]"
          />
          <div className="absolute bottom-[4%] right-[3%] max-w-[190px] border-t border-[#cfcfc0] pt-3 text-[9px] font-extrabold uppercase leading-5 tracking-[0.1em] text-[#7f8c82]">
            Mỗi góc nhỏ đều được giữ lại một chút riêng.
          </div>
        </div>
        <div>
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.19em] text-secondary">
            Nhìn thấy nơi mình sẽ ở
          </p>
          <h2 className="m-0 font-display text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.05em]">
            <span className="block whitespace-nowrap">Căn phòng có</span>
            <em className="block whitespace-nowrap text-[#8f5b3a]">
              cách kể riêng
            </em>
          </h2>
          <p className="mb-0 mt-7 max-w-[430px] text-[13px] font-medium leading-7 text-[#78847b]">
            Có nơi được nhớ bằng màu rèm. Có nơi bằng tiếng cửa mở ra hiên.
            Chúng mình giữ lại những chi tiết khiến bạn nhận ra căn phòng của
            mình ngay từ lần đầu bước vào.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="border-t border-[#cfcfc0] pt-4">
              <BedDouble
                className="mb-4 text-secondary"
                size={19}
                strokeWidth={1.5}
              />
              <h3 className="m-0 font-display text-[24px] font-normal">
                Chỗ ngủ thật êm
              </h3>
              <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-[#78847b]">
                Phòng đôi, phòng đơn và những khoảng vừa vặn cho từng kiểu nghỉ.
              </p>
            </div>
            <div className="border-t border-[#cfcfc0] pt-4">
              <Wifi
                className="mb-4 text-secondary"
                size={19}
                strokeWidth={1.5}
              />
              <h3 className="m-0 font-display text-[24px] font-normal">
                Những tiện nghi cần thiết
              </h3>
              <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-[#78847b]">
                Wifi, ánh sáng, góc làm việc và vật dụng được chuẩn bị vừa đủ.
              </p>
            </div>
            <div className="border-t border-[#cfcfc0] pt-4">
              <Sparkles
                className="mb-4 text-secondary"
                size={19}
                strokeWidth={1.5}
              />
              <h3 className="m-0 font-display text-[24px] font-normal">
                Một căn nhà có nếp
              </h3>
              <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-[#78847b]">
                Gọn gàng, yên tĩnh và luôn có cảm giác được chờ đón.
              </p>
            </div>
            <div className="border-t border-[#cfcfc0] pt-4">
              <Sun
                className="mb-4 text-secondary"
                size={19}
                strokeWidth={1.5}
              />
              <h3 className="m-0 font-display text-[24px] font-normal">
                Ánh sáng theo giờ
              </h3>
              <p className="mb-0 mt-2 text-[11px] font-medium leading-5 text-[#78847b]">
                Mỗi thời điểm trong ngày mang đến một khung cảnh khác cho căn
                phòng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import React from "react";
import Image from "next/image";

const HERO_IMAGE = "/assets/images/auth/luu-tru-nho-hien-nha_334da7fa.webp";
const ROOM_IMAGE = "/assets/images/auth/luu-tru-nho-goc-phong_acb95aea.webp";
const WINDOW_ART = "/assets/images/auth/luu-tru-nho-o-cua_d1bbcd4a.webp";
const LOGO_IMAGE = "/assets/images/logo-stay-flow.png";

const eyebrowClass =
  "m-0 text-[10px] font-extrabold uppercase leading-[1.3] tracking-[0.19em] text-secondary";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative isolate grid min-h-screen overflow-hidden bg-background [grid-template-columns:minmax(430px,46%)_1fr] max-[900px]:[grid-template-columns:minmax(330px,42%)_1fr] max-[680px]:block max-[680px]:overflow-visible">
      <div
        className="grain-texture pointer-events-none fixed inset-0 z-10 opacity-[0.08] mix-blend-multiply"
        aria-hidden="true"
      />

      <section
        className="relative flex min-h-screen overflow-hidden bg-cover bg-center text-[#fffaf2] max-[680px]:min-h-[425px] max-[390px]:min-h-[395px]"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-labelledby="brand-title"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#182418]/95 via-[#3a4a38]/75 to-[#3a4a38]/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#141c13]/40 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-[1] flex min-h-screen flex-1 flex-col px-[clamp(28px,6vw,92px)] pb-[clamp(30px,4vw,62px)] pt-[clamp(30px,5vw,74px)] max-[900px]:px-9 max-[680px]:min-h-[425px] max-[680px]:px-[25px] max-[680px]:pb-[34px] max-[680px]:pt-[30px] max-[390px]:min-h-[395px]">
          <header className="flex animate-[rise-in_520ms_var(--ease-out)_both] items-center gap-[13px]">
            <div
              className="grid size-[47px] place-items-center rounded-[13px_13px_13px_4px] border border-white/45 bg-white/10 backdrop-blur-[8px]"
              aria-hidden="true"
            >
              <Image
                className="size-[31px] object-contain brightness-0 invert opacity-[0.92]"
                src={LOGO_IMAGE}
                alt="Logo"
                width={31}
                height={31}
                priority
              />
            </div>
            <div>
              <p className="m-0 font-display text-[21px] leading-none tracking-[-0.02em]">
                Lưu Trú Nhỏ
              </p>
              <p className="mb-0 mt-[6px] text-[9px] font-extrabold uppercase leading-none tracking-[0.2em] text-white/65">
                homestay & nhà nghỉ
              </p>
            </div>
          </header>

          <div className="my-auto max-w-[650px] animate-[rise-in_640ms_90ms_var(--ease-out)_both] py-[15vh] pb-[18vh] max-[680px]:max-w-none max-[680px]:py-[73px] max-[680px]:pb-[52px] max-[390px]:pt-[48px]">
            <p className={`${eyebrowClass} text-[#d9b291]`}>
              Khu quản lý lưu trú
            </p>
            <h1
              id="brand-title"
              className="m-0 font-display text-[clamp(42px,4vw,65px)] font-normal leading-[0.99] tracking-[-0.045em] max-[900px]:text-[clamp(38px,5vw,52px)] max-[680px]:text-[clamp(39px,11vw,52px)] max-[390px]:text-[34px]"
            >
              <span className="inline-block whitespace-nowrap">
                Mở cửa cho một ngày
              </span>
              <br />
              <span className="inline-block whitespace-nowrap">
                vận hành <em className="text-[#d9b291]">nhẹ hơn.</em>
              </span>
            </h1>
            <p className="mb-0 mt-6 max-w-[390px] text-[13px] font-medium leading-[1.75] text-white/75 max-[680px]:mt-[17px] max-[680px]:max-w-[280px] max-[680px]:text-xs max-[390px]:hidden">
              Một góc nhỏ để bạn giữ mọi căn phòng, lượt đặt và nhịp vận hành ở
              đúng chỗ — bình tĩnh như ánh nắng trên hiên nhà.
            </p>
          </div>

          <div className="flex items-end justify-between gap-[25px] text-[10px] font-bold leading-[1.4] tracking-[0.04em] text-white/72 max-[680px]:text-[9px]">
            <div className="flex items-center gap-[9px]">
              <span className="h-px w-[29px] bg-[#d9b291]" aria-hidden="true" />
              <span>Giữ nếp nhà, giữ nhịp ngày</span>
            </div>
            <div className="flex max-w-[170px] items-center justify-end gap-[9px] text-right text-white/52 max-[900px]:hidden">
              <div
                className="grid size-[22px] shrink-0 place-items-center rounded-full border border-[#d9b291]/55 text-[#e5bd9f]"
                aria-hidden="true"
              >
                <Check size={13} strokeWidth={2.8} />
              </div>
              <span>Được tạo cho những nơi ở có câu chuyện</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[clamp(75px,14vh,130px)] right-[clamp(26px,5vw,80px)] z-[2] aspect-[0.78] w-[clamp(105px,11vw,160px)] rotate-[3.5deg] animate-[float-in_720ms_260ms_var(--ease-out)_both] border border-white/52 bg-[rgba(44,53,38,0.56)] p-[6px] shadow-[0_18px_48px_rgba(17,25,17,0.28)] max-[900px]:right-[25px] max-[900px]:w-[118px] max-[680px]:bottom-[-30px] max-[680px]:right-[21px] max-[680px]:w-[105px]">
          <Image
            className="block h-[calc(100%_-_22px)] w-full object-cover"
            src={ROOM_IMAGE}
            alt="Góc phòng homestay ngập nắng"
            width={300}
            height={400}
            priority
          />
          <div className="flex h-[22px] items-center gap-[6px] text-[7px] font-extrabold uppercase tracking-[0.08em] text-white/76">
            <span
              className="size-[5px] rounded-full bg-[#d9b291]"
              aria-hidden="true"
            />
            <span>Góc hiên hôm nay</span>
          </div>
        </div>

        <div
          className="absolute right-[-42px] top-[16%] z-[1] w-[160px] rotate-[13deg] opacity-[0.22] max-[680px]:right-[-40px] max-[680px]:top-[18%] max-[680px]:w-[130px]"
          aria-hidden="true"
        >
          <Image
            className="block w-full h-auto mix-blend-screen"
            src={WINDOW_ART}
            alt=""
            width={300}
            height={300}
            priority
          />
        </div>
      </section>
      {children}
    </main>
  );
}

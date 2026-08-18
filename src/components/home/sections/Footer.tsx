import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import {
  DEMO_ADDRESS,
  DEMO_DIRECTIONS_URL,
  DEMO_EMAIL,
  DEMO_HOURS,
  DEMO_PHONE,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LOGO_IMAGE,
  ScrollLink,
  ZALO_URL,
} from "../data/homeData";

export function Footer() {
  return (
    <footer
      id="contact-info"
      className="bg-[#26352b] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-[12px_12px_12px_3px] bg-white/10">
                <Image
                  src={LOGO_IMAGE}
                  alt="Logo Lưu Trú Nhỏ"
                  width={28}
                  height={28}
                  className="size-7 object-contain brightness-0 invert"
                />
              </span>
              <span>
                <span className="block font-display text-[23px] leading-none">
                  Lưu Trú Nhỏ
                </span>
                <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                  homestay & nhà nghỉ
                </span>
              </span>
            </div>
            <p className="mb-0 mt-5 max-w-[270px] text-[11px] font-medium leading-6 text-white/58">
              Một chỗ ở nhỏ cho những ngày cần chậm lại, gần gũi hơn và có người
              sẵn sàng hỗ trợ.
            </p>
          </div>
          <div className="grid gap-4 text-[11px] font-medium text-white/70 sm:grid-cols-2">
            <a
              href={DEMO_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 text-white/70 no-underline hover:text-[#d9b291]"
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#d9b291]" />
              <span>
                <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/40">
                  Địa chỉ demo
                </span>
                {DEMO_ADDRESS}
              </span>
            </a>
            <a
              href={`tel:${DEMO_PHONE.replaceAll(" ", "")}`}
              className="flex items-start gap-3 text-white/70 no-underline hover:text-[#d9b291]"
            >
              <Phone size={16} className="mt-0.5 shrink-0 text-[#d9b291]" />
              <span>
                <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/40">
                  Điện thoại
                </span>
                {DEMO_PHONE}
              </span>
            </a>
            <a
              href={`mailto:${DEMO_EMAIL}`}
              className="flex items-start gap-3 text-white/70 no-underline hover:text-[#d9b291]"
            >
              <Mail size={16} className="mt-0.5 shrink-0 text-[#d9b291]" />
              <span>
                <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/40">
                  Email
                </span>
                {DEMO_EMAIL}
              </span>
            </a>
            <div className="flex items-start gap-3 text-white/70">
              <Clock3 size={16} className="mt-0.5 shrink-0 text-[#d9b291]" />
              <span>
                <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/40">
                  Giờ hỗ trợ
                </span>
                {DEMO_HOURS}
              </span>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#d9b291]">
              Theo dõi và nhắn tin
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[10px] font-extrabold text-white no-underline transition-colors hover:border-[#d9b291] hover:text-[#d9b291]"
              >
                <div className="size-5 overflow-hidden rounded-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_2"
                    data-name="Layer 2"
                    viewBox="0 0 275.79 275.79"
                    className="size-5"
                  >
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        fill="#0068ff"
                        fillRule="evenodd"
                        strokeWidth={0}
                        d="M125.16.92h24.44c33.57,0,53.19,4.93,70.61,14.27,17.42,9.34,31.16,22.98,40.39,40.39,9.34,17.42,14.27,37.03,14.27,70.61v24.34c0,33.57-4.93,53.19-14.27,70.61-9.34,17.42-22.98,31.16-40.39,40.39-17.42,9.34-37.03,14.27-70.61,14.27h-24.34c-33.57,0-53.19-4.93-70.61-14.27-17.42-9.34-31.16-22.98-40.39-40.39C4.93,203.72,0,184.1,0,150.52v-24.34c0-33.57,4.93-53.19,14.27-70.61,9.34-17.42,22.98-31.16,40.39-40.39C71.97,5.85,91.69.92,125.16.92Z"
                      />
                      <path
                        fill="#001a33"
                        fillRule="evenodd"
                        strokeWidth={0}
                        opacity={0.12}
                        d="M274.87,146.51v4.02c0,33.57-4.93,53.19-14.27,70.61-9.34,17.42-22.98,31.16-40.39,40.39-17.42,9.34-37.03,14.27-70.61,14.27h-24.34c-27.47,0-45.6-3.3-60.82-9.62l-25.1-25.84,235.52-93.82Z"
                      />
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        strokeWidth={0}
                        d="M42.13,241.23c12.86,1.42,28.93-2.24,40.34-7.78,49.55,27.39,127.02,26.08,173.91-3.93,1.82-2.73,3.52-5.56,5.09-8.51,9.37-17.48,14.32-37.17,14.32-70.86v-24.43c0-33.69-4.95-53.38-14.32-70.86-9.27-17.48-23.06-31.17-40.54-40.54C203.45,4.95,183.76,0,150.07,0h-24.53c-28.7,0-47.33,3.61-62.98,10.51-.86.77-1.7,1.55-2.52,2.34C14.12,57.11,10.63,153.07,49.57,205.2c.04.08.09.15.14.23,6,8.84.21,24.32-8.84,33.38-1.47,1.37-.95,2.21,1.26,2.42Z"
                      />
                      <path
                        fill="#0068ff"
                        strokeWidth={0}
                        d="M112.88,94.08h-53.82v11.54h37.35l-36.82,45.64c-1.15,1.68-1.99,3.25-1.99,6.82v2.94h50.78c2.52,0,4.62-2.1,4.62-4.62v-6.19h-39.24l34.62-43.43c.52-.63,1.47-1.78,1.89-2.31l.21-.31c1.99-2.94,2.41-5.46,2.41-8.5v-1.57Z"
                      />
                      <path
                        fill="#0068ff"
                        strokeWidth={0}
                        d="M181.39,161.02h7.66v-66.93h-11.54v63.05c0,2.1,1.68,3.88,3.88,3.88Z"
                      />
                      <path
                        fill="#0068ff"
                        strokeWidth={0}
                        d="M141.94,108.98c-14.48,0-26.23,11.75-26.23,26.23s11.75,26.23,26.23,26.23,26.23-11.75,26.23-26.23c.11-14.48-11.65-26.23-26.23-26.23ZM141.94,150.63c-8.5,0-15.42-6.92-15.42-15.42s6.92-15.42,15.42-15.42,15.42,6.92,15.42,15.42-6.82,15.42-15.42,15.42Z"
                      />
                      <path
                        fill="#0068ff"
                        strokeWidth={0}
                        d="M223.14,108.56c-14.58,0-26.44,11.86-26.44,26.44s11.85,26.44,26.44,26.44,26.44-11.86,26.44-26.44-11.86-26.44-26.44-26.44ZM223.14,150.63c-8.6,0-15.53-6.92-15.53-15.53s6.92-15.53,15.53-15.53,15.53,6.92,15.53,15.53-6.92,15.53-15.53,15.53Z"
                      />
                      <path
                        fill="#0068ff"
                        strokeWidth={0}
                        d="M162.1,161.01h6.19v-50.57h-10.81v46.06c0,2.41,2.1,4.51,4.62,4.51Z"
                      />
                    </g>
                  </svg>
                </div>
                <span>Zalo</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[10px] font-extrabold text-white no-underline transition-colors hover:border-[#d9b291] hover:text-[#d9b291]"
              >
                <div className="grid size-5 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    viewBox="150 70 260 260"
                    className="size-5"
                  >
                    <path
                      d="m410.096 200.048c0-71.818-58.23-130.048-130.048-130.048s-130.048 58.23-130.048 130.048c0 64.905 47.55 118.709 109.73 128.476v-90.875h-33.029v-37.601h33.029v-28.658c0-32.59 19.422-50.604 49.122-50.604 14.228 0 29.115 2.542 29.115 2.542v32.005h-16.405c-16.148 0-21.196 10.022-21.196 20.318v24.396h36.064l-5.761 37.601h-30.304v90.875c62.18-9.749 109.73-63.553 109.73-128.476z"
                      fill="#1977f3"
                    />
                    <path
                      d="m330.67 237.648 5.761-37.601h-36.064v-24.396c0-10.278 5.029-20.318 21.196-20.318h16.405v-32.005s-14.886-2.542-29.115-2.542c-29.7 0-49.122 17.996-49.122 50.604v28.658h-33.029v37.601h33.029v90.875c6.62 1.041 13.405 1.572 20.318 1.572s13.698-.549 20.318-1.572v-90.875h30.304z"
                      fill="#fefefe"
                    />
                  </svg>
                </div>
                <span>Facebook</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[10px] font-extrabold text-white no-underline transition-colors hover:border-[#d9b291] hover:text-[#d9b291]"
              >
                <div className="size-5 rounded-full overflow-hidden ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 3364.7 3364.7"
                  >
                    <defs>
                      <radialGradient
                        id="0"
                        cx="217.76"
                        cy="3290.99"
                        r="4271.92"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".09" stopColor="#fa8f21" />
                        <stop offset=".78" stopColor="#d82d7e" />
                      </radialGradient>
                      <radialGradient
                        id="1"
                        cx="2330.61"
                        cy="3182.95"
                        r="3759.33"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset=".64"
                          stopColor="#8c3aaa"
                          stopOpacity="0"
                        />
                        <stop offset="1" stopColor="#8c3aaa" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                      fill="url(#0)"
                    />
                    <path
                      d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                      fill="url(#1)"
                    />
                    <path
                      d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] font-bold text-white/50 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5">
            <ScrollLink href="#stay">Không gian</ScrollLink>
            <ScrollLink href="#details">Căn phòng</ScrollLink>
            <ScrollLink href="#faq">Hỏi đáp</ScrollLink>
            <Link
              href="/login"
              className="text-white/50 no-underline hover:text-[#d9b291]"
            >
              Khu quản lý
            </Link>
          </div>
          <span>© 2026 Lưu Trú Nhỏ · Thông tin demo</span>
        </div>
      </div>
    </footer>
  );
}

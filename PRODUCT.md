# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Supabase (@supabase/supabase-js, @supabase/ssr), Radix UI / shadcn/ui

## Users

Quản lý & đội ngũ nhân viên (lễ tân, buồng phòng) tại các chuỗi homestay hoặc boutique hotel với quy mô từ 15 đến 50 phòng.

## Product Purpose

Hệ thống quản lý toàn diện giúp vận hành phòng, quản lý các dịch vụ phụ trợ đi kèm và chăm sóc khách lưu trú, nhằm tối ưu hóa công suất phòng và nâng cao chất lượng dịch vụ.

## Positioning

Hệ thống quản lý chuyên biệt cho homestay và boutique hotel, kết hợp mượt mà giữa sơ đồ phòng trực quan thời gian thực, quản lý dịch vụ và quy trình phối hợp chặt chẽ giữa lễ tân và buồng phòng.

## Operating Context

Môi trường làm việc trực tiếp tại quầy lễ tân (máy tính desktop & máy tính bảng) và thiết bị di động của nhân viên. Đòi hỏi tốc độ thao tác nhanh cho các nghiệp vụ: check-in, check-out, tạo đặt phòng mới, cập nhật tình trạng dọn phòng và ghi nhận dịch vụ.

## Capabilities and Constraints

- Ngôn ngữ giao diện: Tiếng Việt chuẩn hóa.
- Thiết kế tối ưu cho máy tính và máy tính bảng tại quầy.
- Các mô-đun cốt lõi: Dashboard, Đặt phòng (Bookings), Quản lý phòng (Rooms), Khách hàng (Guests), Tài chính (Finance), Buồng phòng (Housekeeping), Dịch vụ (Services), Báo cáo (Reports), Cài đặt (Settings).
- Giữ vững kiến trúc công nghệ hiện tại: Next.js App Router, Supabase, Tailwind CSS, shadcn/ui.

## Brand Commitments

- Tên ứng dụng: Stay Flow (StayFlow)
- Giao diện: Tiếng Việt

## Evidence on Hand

- Codebase đã có sẵn cấu trúc Next.js App Router với đầy đủ các route thuộc nhóm `(dashboard)` và `(auth)`.
- Đã thiết lập hệ thống UI component cơ bản (Radix UI, Tailwind CSS).

## Product Principles

1. **Trực quan & Tốc độ**: Tối ưu hóa giao diện giúp thao tác lễ tân (check-in, check-out, đổi phòng) diễn ra nhanh chóng, ít thao tác thừa.
2. **Đồng bộ thời gian thực**: Trạng thái phòng, buồng phòng và các chi phí phát sinh luôn được cập nhật tức thì giữa các bộ phận.
3. **Toàn diện & Thích ứng**: Quản lý trọn vẹn vòng đời khách lưu trú từ đặt phòng, trải nghiệm dịch vụ đến thanh toán và lưu trữ lịch sử khách hàng.

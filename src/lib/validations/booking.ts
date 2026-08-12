import { z } from "zod";

export const createBookingSchema = z.object({
  roomId: z.string().min(1, "Vui lòng chọn phòng"),
  guestName: z.string().min(2, "Tên khách hàng không được để trống"),
  guestPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
  checkInDate: z.string().min(1, "Vui lòng chọn ngày nhận phòng"),
  checkOutDate: z.string().min(1, "Vui lòng chọn ngày trả phòng"),
  totalGuests: z.number().min(1, "Số khách phải ít nhất là 1"),
  totalPrice: z.number().min(0, "Tổng tiền không hợp lệ"),
  note: z.string().optional(),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;

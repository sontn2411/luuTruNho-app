export interface Room {
  id: string;
  name: string;
  capacity: string;
  floor?: number;
  type?: string;
  price?: number;
  status?: "available" | "occupied" | "dirty" | "maintenance";
  amenities?: string[];
}

export interface DayInfo {
  dayNum: string;
  dayLabel: string;
  isWeekendDay: boolean;
  isSunday: boolean;
  isTodayDate: boolean;
}

// 4 Trạng thái chính: Đã xác nhận, Chờ xác nhận, Đã trả phòng, Bảo trì
export type BookingStatus = "confirmed" | "pending" | "checked_out" | "maintenance";

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestPhone?: string;
  checkIn: string; // Format YYYY-MM-DD HH:mm hoặc YYYY-MM-DD
  checkOut: string; // Format YYYY-MM-DD HH:mm hoặc YYYY-MM-DD
  status: BookingStatus;
  totalAmount?: number;
  paidAmount?: number;
  note?: string;
}

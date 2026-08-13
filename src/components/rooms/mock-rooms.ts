import { ROOMS as BOOKING_ROOMS } from "@/components/bookings/mock-data";
import { Room } from "./types";

export const MOCK_ROOMS: Room[] = BOOKING_ROOMS.map((item) => {
  const number = item.id;
  const floor = item.floor ?? parseInt(number.charAt(0), 10) ?? 1;
  const capacityNum = parseInt(item.capacity.replace(/\D/g, ""), 10) || 2;

  return {
    id: `r${item.id}`,
    number: number,
    type: item.type || "Standard",
    floor: floor,
    capacity: capacityNum,
    price: item.price || 500000,
    status: item.status || "available",
    amenities: item.amenities || ["Wifi", "TV", "Điều hòa"],
    name: item.name,
  };
});

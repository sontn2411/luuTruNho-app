export type RoomStatus = "available" | "occupied" | "dirty" | "maintenance";

export type ViewMode = "grid" | "table";

export interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  capacity: number;
  price: number;
  status: RoomStatus;
  amenities: string[];
  name: string;
}

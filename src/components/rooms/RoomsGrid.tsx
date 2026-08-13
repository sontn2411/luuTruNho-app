import React from "react";
import { Room } from "./types";
import RoomCard from "./RoomCard";

interface RoomsGridProps {
  rooms: Room[];
  formatCurrency: (val: number) => string;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
}

export function RoomsGrid({
  rooms,
  formatCurrency,
  onView,
  onEdit,
  onDelete,
}: RoomsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          formatCurrency={formatCurrency}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RoomsGrid;

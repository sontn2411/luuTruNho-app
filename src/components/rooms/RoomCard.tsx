import React from "react";
import { Users, Eye, Edit3, Trash2 } from "lucide-react";
import { Room } from "./types";
import RoomStatusBadge from "./RoomStatusBadge";

interface RoomCardProps {
  room: Room;
  formatCurrency: (val: number) => string;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
}

export function RoomCard({
  room,
  formatCurrency,
  onView,
  onEdit,
  onDelete,
}: RoomCardProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group space-y-4">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-card text-foreground flex items-center justify-center font-bold text-sm border border-border/60 shadow-xs">
              {room.number}
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                Phòng {room.number}
              </h4>
              <p className="text-[11px] text-muted-foreground font-medium">
                Tầng {room.floor} • {room.type}
              </p>
            </div>
          </div>
          <RoomStatusBadge status={room.status} />
        </div>

        <div className="py-2.5 border-y border-border/40 my-2 space-y-1.5 text-xs text-muted-foreground font-medium">
          <div className="flex items-center justify-between">
            <span>Sức chứa:</span>
            <span className="font-bold text-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-muted-foreground/70" /> {room.capacity} người
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Giá theo đêm:</span>
            <span className="font-bold text-foreground">
              {formatCurrency(room.price)}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 pt-1">
          {room.amenities.map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-lg bg-card text-muted-foreground text-[10px] font-medium border border-border/40"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-border/40">
        <button
          onClick={() => onView?.(room)}
          className="px-3 py-1.5 rounded-xl border border-border/60 bg-card hover:bg-accent text-xs font-semibold text-foreground transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Chi tiết</span>
        </button>
        <button
          onClick={() => onEdit?.(room)}
          className="p-1.5 rounded-xl border border-border/60 bg-card text-foreground hover:bg-accent hover:text-primary transition-all shadow-xs cursor-pointer active:scale-95"
          title="Chỉnh sửa"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete?.(room)}
          className="p-1.5 rounded-xl border border-border/60 bg-card text-foreground hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition-all shadow-xs cursor-pointer active:scale-95"
          title="Xóa"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default RoomCard;

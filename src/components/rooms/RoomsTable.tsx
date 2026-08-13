import React from "react";
import { Eye, Edit3, Trash2, Layers, Users } from "lucide-react";
import { Room } from "./types";
import RoomStatusBadge from "./RoomStatusBadge";

interface RoomsTableProps {
  rooms: Room[];
  formatCurrency: (val: number) => string;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
}

export function RoomsTable({
  rooms,
  formatCurrency,
  onView,
  onEdit,
  onDelete,
}: RoomsTableProps) {
  return (
    <div className="w-full rounded-2xl border border-border/80 bg-card shadow-sm overflow-hidden flex flex-col transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/40 bg-muted/40 text-muted-foreground font-bold text-[11px] md:text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4">Số phòng</th>
              <th className="py-3.5 px-4">Loại phòng</th>
              <th className="py-3.5 px-4">Tầng</th>
              <th className="py-3.5 px-4">Sức chứa</th>
              <th className="py-3.5 px-4">Giá phòng / đêm</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Tiện ích</th>
              <th className="py-3.5 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b border-border/40 hover:bg-accent/30 transition-colors group"
              >
                {/* Số phòng */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-card text-foreground flex items-center justify-center font-bold text-xs border border-border/60 shadow-xs">
                      {room.number}
                    </div>
                    <span className="font-bold text-foreground text-xs md:text-sm group-hover:text-primary transition-colors">
                      {room.name}
                    </span>
                  </div>
                </td>

                {/* Loại phòng */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-accent/60 text-foreground font-semibold text-xs border border-border/40 shadow-2xs">
                    {room.type}
                  </span>
                </td>

                {/* Tầng */}
                <td className="py-3.5 px-4 text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-muted-foreground/70" />
                    <span>Tầng {room.floor}</span>
                  </div>
                </td>

                {/* Sức chứa */}
                <td className="py-3.5 px-4 text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-muted-foreground/70" />
                    <span>{room.capacity} người</span>
                  </div>
                </td>

                {/* Giá phòng */}
                <td className="py-3.5 px-4 font-bold text-foreground">
                  {formatCurrency(room.price)}
                </td>

                {/* Trạng thái */}
                <td className="py-3.5 px-4">
                  <RoomStatusBadge status={room.status} />
                </td>

                {/* Tiện ích */}
                <td className="py-3.5 px-4 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-card text-muted-foreground text-[10px] font-medium border border-border/40"
                      >
                        {item}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="px-2 py-0.5 rounded-lg bg-card text-muted-foreground text-[10px] font-bold border border-border/40">
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Thao tác */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView?.(room)}
                      className="p-1.5 rounded-xl border border-border/60 bg-card text-foreground hover:bg-accent transition-all shadow-xs cursor-pointer active:scale-95"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" />
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomsTable;

"use client";

import React, { useState, useMemo } from "react";
import RoomsHeader from "@/components/rooms/RoomsHeader";
import RoomsTable from "@/components/rooms/RoomsTable";
import RoomsGrid from "@/components/rooms/RoomsGrid";
import RoomsPagination from "@/components/rooms/RoomsPagination";
import RoomsEmptyState from "@/components/rooms/RoomsEmptyState";
import { MOCK_ROOMS } from "@/components/rooms/mock-rooms";
import { Room, ViewMode } from "@/components/rooms/types";

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lọc danh sách phòng theo từ khóa tìm kiếm
  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_ROOMS;
    const q = searchQuery.toLowerCase().trim();
    return MOCK_ROOMS.filter(
      (room) =>
        room.number.toLowerCase().includes(q) ||
        room.type.toLowerCase().includes(q) ||
        room.floor.toString().includes(q),
    );
  }, [searchQuery]);

  // Phân trang
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRooms = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredRooms.slice(start, start + itemsPerPage);
  }, [filteredRooms, safeCurrentPage, itemsPerPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleAddRoom = () => {
    console.log("Mở modal thêm phòng mới");
  };

  const handleViewRoom = (room: Room) => {
    console.log("Xem chi tiết phòng:", room);
  };

  const handleEditRoom = (room: Room) => {
    console.log("Sửa phòng:", room);
  };

  const handleDeleteRoom = (room: Room) => {
    console.log("Xóa phòng:", room);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);
  };

  console.log("=========", filteredRooms);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      {/* Header trang */}
      <RoomsHeader
        defaultViewMode="table"
        onAddRoom={handleAddRoom}
        onSearchChange={handleSearchChange}
        onViewModeChange={setViewMode}
      />

      {/* Nội dung danh sách phòng */}
      {filteredRooms.length === 0 ? (
        <RoomsEmptyState searchQuery={searchQuery} />
      ) : viewMode === "table" ? (
        <RoomsTable
          rooms={paginatedRooms}
          formatCurrency={formatCurrency}
          onView={handleViewRoom}
          onEdit={handleEditRoom}
          onDelete={handleDeleteRoom}
        />
      ) : (
        <RoomsGrid
          rooms={paginatedRooms}
          formatCurrency={formatCurrency}
          onView={handleViewRoom}
          onEdit={handleEditRoom}
          onDelete={handleDeleteRoom}
        />
      )}

      {/* Thanh phân trang */}
      <RoomsPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={filteredRooms.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

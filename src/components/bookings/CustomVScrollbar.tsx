/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface CustomVScrollbarProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  rooms: any[];
  dateList: Date[];
  totalDays: number;
}

export const CustomVScrollbar: React.FC<CustomVScrollbarProps> = ({
  scrollRef,
  rooms,
  dateList,
  totalDays,
}) => {
  const vTrackRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 1,
    clientHeight: 1,
  });

  const [vTrackHeight, setVTrackHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dragV, setDragV] = useState<{
    startY: number;
    startScrollTop: number;
  } | null>(null);

  // Cập nhật thông số cuộn dọc tức thì (0ms latency)
  const updateScrollInfo = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    setScrollInfo({
      scrollTop,
      scrollHeight: Math.max(1, scrollHeight),
      clientHeight: Math.max(1, clientHeight),
    });

    if (vTrackRef.current) {
      const h = vTrackRef.current.getBoundingClientRect().height;
      if (h > 0) setVTrackHeight(h);
    }
  }, [scrollRef]);

  useEffect(() => {
    updateScrollInfo();
    const animId = requestAnimationFrame(updateScrollInfo);

    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      // Cập nhật ngay lập tức vị trí con trượt không trễ frame
      updateScrollInfo();
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollInfo, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, [scrollRef, updateScrollInfo, rooms, dateList, totalDays]);

  // --- TÍNH TOÁN THANH CUỘN DỌC (VERTICAL SCROLLBAR) ---
  const maxScrollY = Math.max(
    0,
    scrollInfo.scrollHeight - scrollInfo.clientHeight,
  );
  const canScrollV = maxScrollY > 0;
  const effectiveTrackHeight =
    vTrackHeight || Math.max(1, scrollInfo.clientHeight - 48);

  // Chiều cao con trượt Dọc (tối thiểu 32px)
  const vThumbHeightPx = canScrollV
    ? Math.max(
        32,
        (scrollInfo.clientHeight / scrollInfo.scrollHeight) *
          effectiveTrackHeight,
      )
    : effectiveTrackHeight;

  const maxVThumbTopPx = Math.max(0, effectiveTrackHeight - vThumbHeightPx);

  // Vị trí Top của con trượt Dọc tính theo pixel
  const vThumbTopPx =
    canScrollV && maxScrollY > 0 && maxVThumbTopPx > 0
      ? (scrollInfo.scrollTop / maxScrollY) * maxVThumbTopPx
      : 0;

  // Nhấp vào Track Dọc
  const handleVTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !vTrackRef.current ||
      !scrollRef.current ||
      !canScrollV ||
      maxVThumbTopPx <= 0
    )
      return;
    const rect = vTrackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const targetThumbTop = Math.max(
      0,
      Math.min(maxVThumbTopPx, clickY - vThumbHeightPx / 2),
    );
    scrollRef.current.scrollTop =
      (targetThumbTop / maxVThumbTopPx) * maxScrollY;
  };

  // Kéo Con Trượt Dọc (Mouse Drag)
  useEffect(() => {
    if (!dragV) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollRef.current || maxVThumbTopPx <= 0) return;
      const deltaY = e.clientY - dragV.startY;
      const deltaScroll = (deltaY / maxVThumbTopPx) * maxScrollY;
      scrollRef.current.scrollTop = Math.max(
        0,
        Math.min(maxScrollY, dragV.startScrollTop + deltaScroll),
      );
    };

    const handleMouseUp = () => setDragV(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scrollRef, dragV, maxVThumbTopPx, maxScrollY]);

  return (
    <div
      ref={vTrackRef}
      onClick={handleVTrackClick}
      /* LƯU Ý: Chỉ dùng transition-opacity, KHÔNG DÙNG transition-all để vị trí transform không bị độ trễ 300ms */
      className={`absolute bg-transparent top-16 bottom-2 right-1 w-1.5 rounded-full transition-opacity duration-300 cursor-pointer z-50 overflow-hidden ${
        canScrollV
          ? isScrolling || dragV
            ? "opacity-100 bg-muted/60"
            : "opacity-0 group-hover/grid:opacity-40 hover:opacity-100! bg-muted/30 hover:bg-muted/60"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (scrollRef.current) {
            setDragV({
              startY: e.clientY,
              startScrollTop: scrollRef.current.scrollTop,
            });
          }
        }}
        style={{
          height: `${vThumbHeightPx}px`,
          transform: `translate3d(0, ${vThumbTopPx}px, 0)`,
        }}
        className={`w-full bg-[#344837] rounded-full absolute top-0 left-0 transition-opacity duration-200 cursor-grab active:cursor-grabbing shadow-xs ${
          isScrolling || dragV ? "opacity-100" : "opacity-80 hover:opacity-100"
        }`}
      />
    </div>
  );
};

export default CustomVScrollbar;

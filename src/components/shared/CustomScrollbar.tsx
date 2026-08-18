"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function CustomScrollbar() {
  const [scrollStats, setScrollStats] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateScrollStats = useCallback(() => {
    const doc = document.documentElement;
    setScrollStats({
      scrollTop: window.scrollY || doc.scrollTop,
      scrollHeight: doc.scrollHeight,
      clientHeight: window.innerHeight || doc.clientHeight,
    });
  }, []);

  useEffect(() => {
    const animId = requestAnimationFrame(() => {
      updateScrollStats();
    });

    const handleScrollOrResize = () => {
      updateScrollStats();
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollStats);
    });
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      observer.disconnect();
    };
  }, [updateScrollStats]);

  const { scrollTop, scrollHeight, clientHeight } = scrollStats;
  const isScrollable = scrollHeight > clientHeight + 10;

  const minThumbHeight = 44;
  const rawThumbHeight =
    clientHeight > 0 && scrollHeight > 0
      ? (clientHeight / scrollHeight) * clientHeight
      : 0;
  const thumbHeight = Math.max(minThumbHeight, rawThumbHeight);
  const maxThumbTop = clientHeight - thumbHeight;

  const maxScrollTop = scrollHeight - clientHeight;
  const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
  const thumbTop = Math.min(
    maxThumbTop,
    Math.max(0, scrollRatio * maxThumbTop),
  );

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startScrollTopRef.current = window.scrollY;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startYRef.current;
      const scrollableHeight = scrollHeight - clientHeight;
      const trackHeight = clientHeight - thumbHeight;
      if (trackHeight <= 0) return;

      const scrollDelta = (deltaY / trackHeight) * scrollableHeight;
      window.scrollTo({
        top: startScrollTopRef.current + scrollDelta,
        behavior: "instant",
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrollHeight, clientHeight, thumbHeight]);

  // Handle Track Click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const targetRatio = clickY / clientHeight;
    const targetScrollTop = targetRatio * (scrollHeight - clientHeight);
    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  if (!isScrollable) return null;

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-1 top-0 bottom-0 z-[9999] flex w-3 justify-center select-none cursor-pointer transition-opacity bg-transparent! duration-300 ${
        isHovered || isDragging ? "opacity-100" : "opacity-75 hover:opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Background Track Pill */}
      <div className="absolute inset-y-2 w-1.5 rounded-full bg-transparent" />

      {/* Draggable Thumb */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
        }}
        className={`absolute top-0 w-2.5 rounded-full shadow-md transition-colors duration-150 cursor-grab active:cursor-grabbing ${
          isDragging
            ? "bg-secondary scale-110 shadow-lg"
            : isHovered
              ? "bg-[#8f5b3a]"
              : "bg-secondary/80"
        }`}
      />
    </div>
  );
}

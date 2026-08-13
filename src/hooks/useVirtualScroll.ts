import { useState, useEffect, useMemo, useRef, RefObject } from "react";

interface UseVirtualScrollOptions<T> {
  items: T[];
  rowHeight: number;
  overscan?: number;
}

interface UseVirtualScrollReturn<T> {
  containerRef: RefObject<HTMLDivElement | null>;
  virtualItems: T[];
  startIndex: number;
  endIndex: number;
  topPadding: number;
  bottomPadding: number;
  scrollTop: number;
  clientHeight: number;
}

export function useVirtualScroll<T>({
  items,
  rowHeight,
  overscan = 4,
}: UseVirtualScrollOptions<T>): UseVirtualScrollReturn<T> {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            setScrollTop(el.scrollTop);
            setClientHeight(el.clientHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const { startIndex, endIndex, topPadding, bottomPadding } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const end = Math.min(
      items.length,
      Math.ceil((scrollTop + clientHeight) / rowHeight) + overscan
    );
    const top = start * rowHeight;
    const bottom = Math.max(0, (items.length - end) * rowHeight);

    return {
      startIndex: start,
      endIndex: end,
      topPadding: top,
      bottomPadding: bottom,
    };
  }, [scrollTop, clientHeight, items.length, rowHeight, overscan]);

  const virtualItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  return {
    containerRef,
    virtualItems,
    startIndex,
    endIndex,
    topPadding,
    bottomPadding,
    scrollTop,
    clientHeight,
  };
}

export default useVirtualScroll;

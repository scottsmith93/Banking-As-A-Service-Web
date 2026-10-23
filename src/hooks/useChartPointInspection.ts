import { useEffect, useRef, useState, type HTMLAttributes } from "react";

/** One keyboard stop per chart, not one per day. Pointer inspection also works
 * on empty days/above short bars, while arrow keys expose the identical data. */
export function useChartPointInspection(count: number, plot: { left: number; right: number; top: number; bottom: number }, width: number, height: number, onInspect: () => void) {
  const [index, setIndex] = useState<number | null>(null);
  const [keyboard, setKeyboard] = useState(false);
  const focused = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const keepOpen = () => clearTimeout(closeTimer.current);
  const closeSoon = () => {
    keepOpen();
    // Small crossing grace period lets users hover/read the floating popup.
    if (!focused.current) closeTimer.current = setTimeout(() => setIndex(null), 150);
  };
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") { clearTimeout(closeTimer.current); setIndex(null); } };
    document.addEventListener("keydown", dismiss);
    return () => { clearTimeout(closeTimer.current); document.removeEventListener("keydown", dismiss); };
  }, []);
  const activeIndex = index !== null && count ? Math.min(index, count - 1) : null;
  const interactionProps: HTMLAttributes<HTMLDivElement> = {
    onPointerMove: event => {
      // React portal events still bubble through the chart's React tree. The
      // floating popup is not a plot hit and must not schedule its own removal.
      if (event.target instanceof Node && !event.currentTarget.contains(event.target)) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) * width / rect.width;
      const y = (event.clientY - rect.top) * height / rect.height;
      if (x < plot.left || x > plot.right || y < plot.top || y > plot.bottom) { closeSoon(); return; }
      keepOpen(); setKeyboard(false); onInspect();
      setIndex(Math.min(count - 1, Math.max(0, Math.floor((x - plot.left) / (plot.right - plot.left) * count))));
    },
    onPointerLeave: event => {
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest('[role="tooltip"]')) keepOpen();
      else closeSoon();
    },
    onFocus: () => { keepOpen(); focused.current = true; setKeyboard(true); setIndex(count - 1); onInspect(); },
    onBlur: () => { focused.current = false; keepOpen(); setIndex(null); },
    onKeyDown: event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(event.key)) return;
      event.preventDefault(); keepOpen(); setKeyboard(true);
      if (event.key === "Escape") { setIndex(null); return; }
      onInspect();
      setIndex(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : Math.min(count - 1, Math.max(0, (activeIndex ?? count - 1) + (event.key === "ArrowLeft" ? -1 : 1))));
    },
  };
  return { activeIndex, keyboard, interactionProps, keepOpen, closeSoon };
}

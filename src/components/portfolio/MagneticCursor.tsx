import { useEffect, useRef, useState } from "react";

const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let magnetX = 0, magnetY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);

      const target = e.target as HTMLElement;
      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        magnetX = cx + (mouseX - cx) * 0.3;
        magnetY = cy + (mouseY - cy) * 0.3;
        setHovering(true);
      } else {
        magnetX = mouseX;
        magnetY = mouseY;
        setHovering(false);
      }
    };

    const onLeave = () => setHidden(true);

    let raf: number;
    const tick = () => {
      ringX += (magnetX - ringX) * 0.18;
      ringY += (magnetY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${hovering ? 1.6 : 1})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hovering]);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-200 ${hidden ? "opacity-0" : "opacity-100"}`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-primary pointer-events-none z-[9999] transition-[opacity,border-color,background-color] duration-200 ${hidden ? "opacity-0" : "opacity-70"} ${hovering ? "bg-primary/10" : ""}`}
      />
    </>
  );
};

export default MagneticCursor;

import { useEffect, useRef } from "react";

/** Wraps hero content; fades + lifts it as the user scrolls down. */
const HeroParallax = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, y / (vh * 0.8)));
        el.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 - p * 0.05})`;
        el.style.opacity = String(1 - p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
};

export default HeroParallax;

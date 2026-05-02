import { Suspense, lazy, useEffect, useState } from "react";

const TechOrbit = lazy(() => import("./TechOrbit"));

/**
 * Renders the 3D orbit. As the user scrolls past the hero, it shrinks
 * and docks into the bottom-right corner as a permanent floating widget.
 */
const FloatingOrbit = () => {
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setDocked(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed z-30 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={
        docked
          ? {
              width: "180px",
              height: "180px",
              right: "20px",
              bottom: "20px",
              top: "auto",
              left: "auto",
            }
          : {
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
            }
      }
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ${
          docked
            ? "rounded-full glass-card border-2 border-primary/40 shadow-[0_0_40px_hsl(38_95%_58%/0.3)] overflow-hidden"
            : ""
        }`}
        style={{ pointerEvents: docked ? "auto" : "none" }}
      >
        <div className="absolute inset-0" style={{ pointerEvents: "auto" }}>
          <Suspense fallback={null}>
            <TechOrbit />
          </Suspense>
        </div>
        {docked && (
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full font-mono text-[9px] uppercase tracking-widest text-primary whitespace-nowrap">
            my stack ↻
          </span>
        )}
      </div>
    </div>
  );
};

export default FloatingOrbit;

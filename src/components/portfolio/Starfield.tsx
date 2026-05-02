import { useEffect, useRef } from "react";

/** Lightweight animated starfield with subtle parallax + twinkle. */
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: 0, y: 0 };

    type Star = {
      x: number;
      y: number;
      z: number; // depth 0..1
      r: number;
      tw: number; // twinkle phase
      tws: number; // twinkle speed
    };
    let stars: Star[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 9000); // density
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.3 + z * 1.6,
          tw: Math.random() * Math.PI * 2,
          tws: 0.6 + Math.random() * 1.8,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left - w / 2) / w;
      mouse.y = (e.clientY - rect.top - h / 2) / h;
    };

    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);

      const px = mouse.x * 18;
      const py = mouse.y * 18;

      for (const s of stars) {
        // gentle drift
        s.y += (0.04 + s.z * 0.18) * dt * 60;
        if (s.y > h + 4) {
          s.y = -4;
          s.x = Math.random() * w;
        }
        s.tw += dt * s.tws;

        const ox = s.x + px * s.z;
        const oy = s.y + py * s.z;
        const twinkle = 0.55 + 0.45 * Math.sin(s.tw);
        const alpha = (0.25 + s.z * 0.75) * twinkle;

        // warm tint on bright stars, cool on faint ones
        const warm = s.z > 0.75;
        ctx.beginPath();
        ctx.fillStyle = warm
          ? `hsla(40, 95%, 70%, ${alpha})` // amber accent
          : `hsla(220, 30%, 90%, ${alpha * 0.85})`;
        ctx.arc(ox, oy, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (warm && twinkle > 0.85) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(40, 95%, 70%, ${alpha * 0.25})`;
          ctx.arc(ox, oy, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default Starfield;

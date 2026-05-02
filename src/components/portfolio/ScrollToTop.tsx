import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const p = height > 0 ? (scrolled / height) * 100 : 0;
      setProgress(p);
      setVisible(scrolled > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-background/70 backdrop-blur border border-border flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}% 100%)`,
      }}
    >
      <span className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
        <ArrowUp className="h-4 w-4 text-primary" />
      </span>
    </button>
  );
};

export default ScrollToTop;

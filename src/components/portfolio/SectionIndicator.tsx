import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SectionIndicator = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-end gap-3"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono px-2 py-1 rounded bg-background/80 backdrop-blur border border-border ${
                isActive ? "opacity-100 text-primary" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                  : "h-2 w-2 bg-muted-foreground/40 group-hover:bg-primary/60"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SectionIndicator;

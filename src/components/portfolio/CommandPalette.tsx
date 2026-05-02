import { useEffect, useState, useMemo } from "react";
import { Search, ArrowRight, Mail, Github, Linkedin, FileText, Briefcase, Code2, Award, User, MessageSquare, LucideIcon } from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint: string;
  Icon: LucideIcon;
  action: () => void;
  group: "Navigate" | "Contact" | "Links";
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const items: Item[] = useMemo(() => [
    { id: "about", label: "About", hint: "Who I am", Icon: User, action: () => goto("about"), group: "Navigate" },
    { id: "skills", label: "Skills", hint: "What I use", Icon: Code2, action: () => goto("skills"), group: "Navigate" },
    { id: "experience", label: "Experience", hint: "Where I've worked", Icon: Briefcase, action: () => goto("experience"), group: "Navigate" },
    { id: "projects", label: "Projects", hint: "What I've built", Icon: FileText, action: () => goto("projects"), group: "Navigate" },
    { id: "achievements", label: "Achievements", hint: "Impact numbers", Icon: Award, action: () => goto("achievements"), group: "Navigate" },
    { id: "contact", label: "Contact", hint: "Get in touch", Icon: MessageSquare, action: () => goto("contact"), group: "Navigate" },
    {
      id: "copy-email", label: "Copy email", hint: "Ramlingam.prem@gmail.com", Icon: Mail,
      action: () => { navigator.clipboard.writeText("Ramlingam.prem@gmail.com"); showToast("Email copied ✓"); setOpen(false); },
      group: "Contact",
    },
    {
      id: "send-email", label: "Send email", hint: "Open mail client", Icon: Mail,
      action: () => { window.location.href = "mailto:Ramlingam.prem@gmail.com"; setOpen(false); },
      group: "Contact",
    },
    {
      id: "copy-phone", label: "Copy phone", hint: "+1 (312) 730-7277", Icon: MessageSquare,
      action: () => { navigator.clipboard.writeText("+13127307277"); showToast("Phone copied ✓"); setOpen(false); },
      group: "Contact",
    },
    {
      id: "github", label: "Open GitHub", hint: "@prem04-buzz", Icon: Github,
      action: () => { window.open("https://github.com/prem04-buzz", "_blank"); setOpen(false); },
      group: "Links",
    },
    {
      id: "linkedin", label: "Open LinkedIn", hint: "Connect professionally", Icon: Linkedin,
      action: () => { window.open("https://www.linkedin.com/in/prem-ramalingam-81b35238b", "_blank"); setOpen(false); },
      group: "Links",
    },
  ], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(i => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
        setQuery("");
        setActive(0);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); filtered[active]?.action(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, filtered]);

  // group items
  const groups = useMemo(() => {
    const map: Record<string, Item[]> = {};
    filtered.forEach(i => {
      if (!map[i.group]) map[i.group] = [];
      map[i.group].push(i);
    });
    return map;
  }, [filtered]);

  let cursor = -1;

  return (
    <>
      {/* Floating hint button */}
      <button
        onClick={() => setOpen(true)}
        data-magnetic
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary transition-colors group"
        aria-label="Open command palette"
      >
        <Search size={14} />
        <span>Quick nav</span>
        <kbd className="ml-1 px-1.5 py-0.5 rounded bg-secondary text-[10px] border border-border">⌘K</kbd>
      </button>

      {toast && (
        <div className="fixed bottom-24 right-6 z-[60] px-4 py-2 rounded-full bg-gradient-amber text-primary-foreground text-sm font-semibold shadow-amber animate-fade-in">
          {toast}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-background/70 backdrop-blur-md animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl glass-card rounded-2xl overflow-hidden shadow-2xl border border-primary/20 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={18} className="text-primary" />
              <input
                autoFocus
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0); }}
                placeholder="Type a command or jump to a section..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="px-2 py-0.5 rounded bg-secondary text-[10px] font-mono border border-border">esc</kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No results for "{query}"
                </div>
              )}
              {Object.entries(groups).map(([group, list]) => (
                <div key={group} className="mb-2">
                  <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{group}</p>
                  {list.map(item => {
                    cursor++;
                    const isActive = cursor === active;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setActive(cursor)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                          isActive ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-secondary/50"
                        }`}
                      >
                        <item.Icon size={16} className={isActive ? "text-primary" : ""} />
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-muted-foreground/70 truncate max-w-[180px]">{item.hint}</span>
                        {isActive && <ArrowRight size={14} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="px-4 py-2.5 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border">↑↓</kbd> navigate
                <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border">↵</kbd> select
              </span>
              <span>built for recruiters in a hurry</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;

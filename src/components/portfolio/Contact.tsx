import Section from "./Section";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";

const channels = [
  { Icon: Mail, label: "Email", value: "Ramlingam.prem@gmail.com", href: "mailto:Ramlingam.prem@gmail.com" },
  { Icon: Phone, label: "Phone", value: "+1 (312) 730-7277", href: "tel:+13127307277" },
  { Icon: MapPin, label: "Location", value: "Chicago, IL", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: "https://www.linkedin.com/in/prem-ramalingam-81b35238b" },
  { Icon: Github, label: "GitHub", value: "@prem04-buzz", href: "https://github.com/prem04-buzz" },
];

const Contact = () => (
  <Section
    id="contact"
    eyebrow="contact"
    title={<>Let's build something.</>}
    description="Open to software engineering, data engineering, and AI/ML roles. Always happy to chat about cool projects or research."
  >
    <div className="grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 reveal glass-card rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Have an idea?<br />
            <span className="text-gradient-amber">Let's make it real.</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md">
            The fastest way to reach me is email — I usually reply within a day.
          </p>
          <a
            href="mailto:Ramlingam.prem@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber text-primary-foreground font-semibold shadow-amber hover:scale-105 transition-transform"
          >
            Send me an email
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="md:col-span-2 space-y-3">
        {channels.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="reveal flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-primary/50 hover:translate-x-1 transition-all duration-500 group"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
              <c.Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{c.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>

    <footer className="mt-24 pt-8 border-t border-border text-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} Prem Swaroopa Nanda Ramalingam · Built with{" "}
        <span className="text-primary">care</span> in Chicago.
      </p>
    </footer>
  </Section>
);

export default Contact;

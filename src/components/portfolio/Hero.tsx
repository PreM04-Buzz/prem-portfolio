import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Suspense, lazy } from "react";
import profile from "@/assets/profile.jpg";
import ScrambleText from "./ScrambleText";
import TypingRole from "./TypingRole";
import MagneticButton from "./MagneticButton";
import HeroParallax from "./HeroParallax";
import Starfield from "./Starfield";

const TechOrbit = lazy(() => import("./TechOrbit"));

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* glow backdrop */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      {/* Animated starfield */}
      <Starfield />

      {/* 3D orbiting tech logos — drag to rotate */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <TechOrbit />
        </Suspense>
      </div>

      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 pointer-events-none">
        ↻ drag to rotate · my stack
      </div>

      <HeroParallax>
      <div className="container-custom relative z-10 text-center px-6">
        {/* Avatar with glow ring */}
        <div className="relative inline-block mb-8 animate-scale-in" data-magnetic>
          <div className="absolute inset-0 rounded-full bg-gradient-amber blur-2xl opacity-50 animate-glow-pulse" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-amber">
            <img
              src={profile}
              alt="Prem Swaroopa Nanda Ramalingam"
              width={160}
              height={160}
              className="w-full h-full rounded-full object-cover border-2 border-background"
            />
          </div>
          <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-4 border-background" aria-label="Available" />
        </div>

        <p className="font-mono text-sm text-primary mb-4 animate-fade-in">
          ~ I Refuse Your Refusal
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05]">
          <ScrambleText text="Prem Swaroopa" className="text-gradient block" />
          <ScrambleText text="Nanda Ramalingam" className="text-gradient-amber block" delay={300} />
        </h1>

        <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up min-h-[3.5rem]" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <span>I'm a </span>
          <TypingRole roles={["Software Engineer", "ML Engineer", "Cloud Architect", "Data Engineer", "Researcher"]} />
          <span className="block mt-2 text-base md:text-lg">crafting <span className="text-foreground font-medium">scalable systems</span> & <span className="text-foreground font-medium">delightful experiences</span>.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> Chicago, IL</span>
          <span className="opacity-30">•</span>
          <span>Open to opportunities</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s", opacity: 0 }}>
          <a
            href="#projects"
            data-magnetic
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-amber text-primary-foreground font-semibold shadow-amber hover:scale-105 transition-transform"
          >
            View my work
            <ArrowDown size={18} />
          </a>
          <a
            href="#contact"
            data-magnetic
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-card text-foreground font-semibold hover:border-primary transition-colors"
          >
            Get in touch
          </a>
        </div>

        {/* Social row */}
        <div className="flex items-center justify-center gap-5 mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          {[
            { Icon: Github, href: "https://github.com/prem04-buzz", label: "GitHub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/prem-ramalingam-81b35238b", label: "LinkedIn" },
            { Icon: Mail, href: "mailto:Ramlingam.prem@gmail.com", label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              data-magnetic
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-11 h-11 grid place-items-center rounded-full glass-card text-muted-foreground hover:text-primary hover:border-primary hover:-translate-y-1 transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      </HeroParallax>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

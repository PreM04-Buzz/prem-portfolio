import { useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";
import MagneticCursor from "@/components/portfolio/MagneticCursor";
import Spotlight from "@/components/portfolio/Spotlight";
import CommandPalette from "@/components/portfolio/CommandPalette";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import ScrollToTop from "@/components/portfolio/ScrollToTop";
import SectionIndicator from "@/components/portfolio/SectionIndicator";


const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Spotlight />
      <MagneticCursor />
      <CommandPalette />
      <SectionIndicator />
      <ScrollToTop />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
};

export default Index;

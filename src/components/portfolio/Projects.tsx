import Section from "./Section";
import TiltCard from "./TiltCard";
import { ArrowUpRight, Brain, Smartphone, Layout } from "lucide-react";

const projects = [
  {
    Icon: Brain,
    title: "MobileNetV2 Object Detection",
    period: "Jan — Mar 2025",
    tags: ["PyTorch", "Computer Vision", "Mixed-Precision"],
    body: "Object detection pipeline over 9,963 images across 20 categories. Mixed-precision training & regularization improved throughput while keeping the model deployable on resource-constrained environments.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    Icon: Layout,
    title: "UniLife Hub — UX Design",
    period: "Jan — Mar 2024",
    tags: ["UX Research", "Wireframing", "Prototyping"],
    body: "Student-centric UX for managing academics, campus life, and career planning. Led research, storyboarding, and built interactive prototypes — measured usability via completion rate and time-on-task.",
    accent: "from-amber-400/20 to-yellow-500/10",
  },
  {
    Icon: Smartphone,
    title: "HawkGen Mobile App",
    period: "Aug — Dec 2023",
    tags: ["Mobile", "Modular Architecture", "Agile"],
    body: "Modular mobile app for course planning, task tracking, and deadline management. Reusable components reduced duplicated code and dropped development time by ~15%.",
    accent: "from-orange-500/20 to-amber-500/10",
  },
];

const Projects = () => (
  <Section
    id="projects"
    eyebrow="projects"
    title={<>Selected work.</>}
    description="A few projects across applied ML, mobile, and product design."
  >
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <TiltCard
          key={p.title}
          className={`reveal ${i === 0 ? "md:col-span-2" : ""}`}
        >
        <article
          data-magnetic
          className="group relative glass-card rounded-3xl p-8 overflow-hidden hover:border-primary/50 transition-all duration-500"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

          <div className="relative">
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <p.Icon size={26} />
              </div>
              <ArrowUpRight
                size={22}
                className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
              />
            </div>

            <p className="font-mono text-xs text-primary mb-2">{p.period}</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">{p.body}</p>

            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-mono text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
        </TiltCard>
      ))}
    </div>
  </Section>
);

export default Projects;

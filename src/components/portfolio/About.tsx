import Section from "./Section";
import TiltCard from "./TiltCard";
import { GraduationCap, Briefcase, Sparkles } from "lucide-react";

const cards = [
  {
    Icon: Sparkles,
    title: "What I do",
    body: "Build scalable cloud data pipelines and apply machine learning to real-world problems — with attention to clean architecture and user experience.",
  },
  {
    Icon: Briefcase,
    title: "Background",
    body: "2 years at HCL Technologies on production AWS & GCP data systems. Currently a CS graduate researcher exploring graph reinforcement learning.",
  },
  {
    Icon: GraduationCap,
    title: "Currently",
    body: "MS Computer Science at Governors State University (GPA 3.9). Researching AI requirement prioritization with Deep Q-Learning.",
  },
];

const About = () => (
  <Section
    id="about"
    eyebrow="about"
    title={<>Engineer. Researcher. Builder.</>}
    description="I design and build software at the intersection of cloud engineering, applied ML, and human-centered design — turning complex systems into reliable, intuitive products."
  >
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map(({ Icon, title, body }, i) => (
        <TiltCard key={title} className="reveal" >
          <div
            data-magnetic
            className="glass-card rounded-3xl p-7 hover:border-primary/50 transition-all duration-500 h-full"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center mb-5 text-primary">
              <Icon size={22} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{body}</p>
          </div>
        </TiltCard>
      ))}
    </div>
  </Section>
);

export default About;

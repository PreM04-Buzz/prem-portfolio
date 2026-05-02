import Section from "./Section";

const stats = [
  { value: "40%", label: "Reduction in manual cloud work at HCL" },
  { value: "20%", label: "Speed-up on GCS → BigQuery pipelines" },
  { value: "30%", label: "Faster processing via scalable cloud models" },
  { value: "25%", label: "Less repetitive engineering via ML automation" },
  { value: "18%", label: "Cloud storage & compute cost reduction" },
  { value: "0", label: "Downtime on on-prem → AWS/GCP migrations" },
];

const Achievements = () => (
  <Section
    id="achievements"
    eyebrow="impact"
    title={<>Numbers that matter.</>}
    description="Quantified outcomes from real shipped work — efficiency gains, cost savings, and reliability improvements."
  >
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="reveal glass-card rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <div className="font-display text-4xl md:text-5xl font-bold text-gradient-amber mb-2">
            {s.value}
          </div>
          <p className="text-sm text-muted-foreground leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  </Section>
);

export default Achievements;

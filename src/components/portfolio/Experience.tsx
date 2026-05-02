import Section from "./Section";

const items = [
  {
    role: "Graduate Researcher",
    company: "Governors State University",
    location: "Chicago, IL",
    period: "Aug 2025 — Present",
    title: "AI Requirement Prioritization with Graph RL",
    bullets: [
      "Built requirement graphs using perplexity & probability metrics to model feature relationships and release constraints.",
      "Developed a Deep Q-Learning agent for dynamic release planning under shifting stakeholder needs.",
      "Evaluated on Zoom, Webex, Teams, Word, Excel, PowerPoint datasets to compare prioritization quality.",
      "Produced visual reports analyzing trade-offs across value, risk, and effort.",
    ],
  },
  {
    role: "Software Engineer",
    company: "HCL Technologies",
    location: "Chennai, India",
    period: "Nov 2021 — Aug 2023",
    title: "Cloud Data Engineering",
    bullets: [
      "Built and optimized production pipelines using AWS S3, Glue ETL, Redshift, and SNS for large-scale clients.",
      "Automated cloud workflows in Python, reducing manual effort and improving operational reliability.",
      "Tuned GCS → BigQuery pipelines (partitioning, clustering, storage) for ~20% throughput gain.",
      "Managed streaming + batch workloads via Dataflow and Firestore for analytics use cases.",
    ],
  },
];

const Experience = () => (
  <Section
    id="experience"
    eyebrow="experience"
    title={<>Where I've built things.</>}
    description="From production cloud systems to graduate research — here's where I've shipped meaningful work."
  >
    <div className="relative">
      {/* timeline line */}
      <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />

      <div className="space-y-10">
        {items.map((it, i) => (
          <div
            key={i}
            className="reveal relative pl-12 md:pl-20"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="absolute left-0 md:left-2 top-1.5 w-9 h-9 rounded-full bg-gradient-amber grid place-items-center shadow-amber">
              <div className="w-3 h-3 rounded-full bg-background" />
            </div>

            <div className="glass-card rounded-3xl p-7 hover:border-primary/40 transition-colors">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-display text-2xl font-semibold">{it.role}</h3>
                <span className="font-mono text-xs text-primary">{it.period}</span>
              </div>
              <p className="text-primary font-medium mb-1">{it.company}</p>
              <p className="text-sm text-muted-foreground mb-4">{it.location} · <span className="italic">{it.title}</span></p>
              <ul className="space-y-2.5">
                {it.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default Experience;

import Section from "./Section";

const groups = [
  {
    title: "Deep Learning",
    items: ["Transformers", "BERT-style", "CNN", "RNN", "LSTM", "GRU", "GANs", "Attention", "Reinforcement Learning", "Policy Optimization"],
  },
  {
    title: "ML Frameworks",
    items: ["PyTorch", "TensorFlow", "Keras", "ONNX", "HuggingFace", "Scikit-Learn"],
  },
  {
    title: "Core ML & Optimization",
    items: ["Quantization", "Pruning", "Distillation", "Mixed-Precision", "INT8 / FP16 Inference"],
  },
  {
    title: "NLP & Computer Vision",
    items: ["Tokenization", "Embeddings", "Multimodal Learning", "Object Detection", "Image Augmentation"],
  },
  {
    title: "Programming",
    items: ["Python", "Java", "SQL", "JavaScript", "TypeScript", "C / C++", "Go"],
  },
  {
    title: "Cloud & Data",
    items: ["AWS S3", "Glue ETL", "Redshift", "DynamoDB", "BigQuery", "Dataflow", "Firestore", "GCS"],
  },
  {
    title: "Tools & Practices",
    items: ["Git", "Docker", "Kubernetes", "REST APIs", "Linux", "Agile / Scrum", "Jira"],
  },
  {
    title: "Research",
    items: ["Experiment Design", "Benchmarking", "Ablation Studies", "Model Interpretability"],
  },
];

const Skills = () => (
  <Section
    id="skills"
    eyebrow="skills"
    title={<>The toolkit.</>}
    description="The technologies and methods I reach for, organized by what they help me build."
  >
    <div className="grid md:grid-cols-2 gap-6">
      {groups.map((g, i) => (
        <div
          key={g.title}
          className="reveal glass-card rounded-3xl p-6 hover:border-primary/40 transition-all duration-500"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <h3 className="font-mono text-sm text-primary mb-4 uppercase tracking-wider">
            {g.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full bg-secondary/60 text-secondary-foreground text-sm border border-border hover:border-primary hover:text-primary hover:scale-105 transition-all cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;

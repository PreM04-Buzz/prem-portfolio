import { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, eyebrow, title, description, children }: Props) => (
  <section id={id} className="section-padding relative">
    <div className="container-custom">
      <div className="max-w-2xl mb-16 reveal">
        <p className="font-mono text-sm text-primary mb-3">~ {eyebrow}</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);

export default Section;

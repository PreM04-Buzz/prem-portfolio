import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

const ScrambleText = ({ text, className, delay = 0 }: Props) => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let frame = 0;
    let raf: number;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = "";

    const length = Math.max(oldText.length, text.length);
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40) + 10;
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let out = "";
      let complete = 0;
      for (const item of queue) {
        if (frame >= item.end) {
          complete++;
          out += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += `<span style="opacity:0.6;color:hsl(38 95% 58%)">${item.char}</span>`;
        } else {
          out += item.from;
        }
      }
      setOutput(out);
      if (complete < queue.length) {
        frame++;
        raf = requestAnimationFrame(update);
      }
    };

    const timer = setTimeout(() => { raf = requestAnimationFrame(update); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: output || text }} />;
};

export default ScrambleText;

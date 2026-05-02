import { useEffect, useState } from "react";

interface Props {
  roles: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypingRole = ({ roles, typeSpeed = 80, deleteSpeed = 40, pauseTime = 1600 }: Props) => {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, roles, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="text-gradient-amber font-semibold">
      {text}
      <span className="inline-block w-[2px] h-5 md:h-6 bg-primary ml-1 align-middle animate-pulse" />
    </span>
  );
};

export default TypingRole;

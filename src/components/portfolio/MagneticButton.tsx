import { ReactNode, useRef, MouseEvent } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  strength?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const MagneticButton = ({ href, onClick, className, children, strength = 0.4, ...rest }: Props) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const sharedProps = {
    className: `transition-transform duration-300 ease-out will-change-transform ${className || ""}`,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "data-magnetic": true,
  };

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...rest} {...sharedProps}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
};

export default MagneticButton;

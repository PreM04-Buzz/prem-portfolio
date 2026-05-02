import { ReactNode } from "react";
import Tilt from "react-parallax-tilt";

interface Props {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className }: Props) => (
  <Tilt
    tiltMaxAngleX={6}
    tiltMaxAngleY={6}
    perspective={1200}
    transitionSpeed={1500}
    glareEnable
    glareMaxOpacity={0.12}
    glareColor="#fbbf24"
    glarePosition="all"
    glareBorderRadius="24px"
    scale={1.02}
    className={className}
  >
    {children}
  </Tilt>
);

export default TiltCard;

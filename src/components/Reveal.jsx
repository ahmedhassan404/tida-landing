import BlurFade from "./magicui/BlurFade.jsx";

export default function Reveal({ children, className = "", delay = 0 }) {
  return (
    <BlurFade className={className} delay={delay}>{children}</BlurFade>
  );
}

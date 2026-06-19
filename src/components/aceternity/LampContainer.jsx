import { classNames } from "../ui/classNames.js";

export default function LampContainer({ children, className }) {
  return (
    <div className={classNames("lamp-container", className)}>
      <div className="lamp-glow" aria-hidden="true" />
      <div className="lamp-line" aria-hidden="true" />
      <div className="lamp-content">{children}</div>
    </div>
  );
}

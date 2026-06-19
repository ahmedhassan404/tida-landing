import {
  BarChart3,
  Boxes,
  Crosshair,
  LayoutDashboard,
  Megaphone,
  PanelsTopLeft,
} from "lucide-react";

const STEP_ICONS = {
  discover: Crosshair,
  strategy: PanelsTopLeft,
  digital: LayoutDashboard,
  launch: Megaphone,
  operate: Boxes,
  measure: BarChart3,
};

export default function ProcessVisual({ step }) {
  const Icon = STEP_ICONS[step.id];

  return (
    <div className={`process-visual process-visual-${step.id}`}>
      <div className="process-visual-top">
        <span>{step.visualLabel}</span>
        <Icon size={19} />
      </div>
      <div className="process-visual-canvas" aria-hidden="true">
        <span className="visual-ring visual-ring-one" />
        <span className="visual-ring visual-ring-two" />
        <span className="visual-pulse" />
        <svg viewBox="0 0 420 170" preserveAspectRatio="none">
          <path d="M2 150C60 148 72 112 128 122C180 132 202 72 260 88C310 101 342 54 418 24" />
        </svg>
      </div>
      <div className="process-points">
        {step.points.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </div>
  );
}

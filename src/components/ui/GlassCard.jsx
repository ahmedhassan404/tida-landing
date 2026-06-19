import Card from "./Card.jsx";
import { classNames } from "./classNames.js";

export default function GlassCard({ className, ...props }) {
  return <Card className={classNames("glass-card", className)} {...props} />;
}

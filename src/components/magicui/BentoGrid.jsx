import { classNames } from "../ui/classNames.js";

export function BentoGrid({ className, ...props }) {
  return <div className={classNames("bento-grid", className)} {...props} />;
}

export function BentoCard({ className, ...props }) {
  return <article className={classNames("bento-card", className)} {...props} />;
}

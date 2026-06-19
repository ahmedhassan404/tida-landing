import Reveal from "../Reveal.jsx";
import Badge from "./Badge.jsx";
import { classNames } from "./classNames.js";

export default function SectionHeader({
  className,
  description,
  eyebrow,
  split = false,
  title,
  titleId,
}) {
  if (split) {
    return (
      <Reveal className={classNames("section-heading", "split-heading", className)}>
        <div>
          <Badge>{eyebrow}</Badge>
          <h2 id={titleId}>{title}</h2>
        </div>
        <p>{description}</p>
      </Reveal>
    );
  }

  return (
    <Reveal className={classNames("section-heading", className)}>
      <Badge>{eyebrow}</Badge>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

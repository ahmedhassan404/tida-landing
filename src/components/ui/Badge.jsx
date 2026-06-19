import { classNames } from "./classNames.js";

export default function Badge({ children, className }) {
  return <span className={classNames("eyebrow", className)}>{children}</span>;
}

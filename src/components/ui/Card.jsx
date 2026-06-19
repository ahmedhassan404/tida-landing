import { classNames } from "./classNames.js";

export default function Card({ as: Element = "div", children, className, ...props }) {
  return (
    <Element className={classNames("card", className)} {...props}>
      {children}
    </Element>
  );
}

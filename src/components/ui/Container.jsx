import { classNames } from "./classNames.js";

export default function Container({ as: Element = "div", children, className, ...props }) {
  return (
    <Element className={classNames("container", className)} {...props}>
      {children}
    </Element>
  );
}

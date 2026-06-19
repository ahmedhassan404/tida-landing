import { classNames } from "./classNames.js";

export default function Input({ className, type = "text", ...props }) {
  return <input className={classNames("input", className)} type={type} {...props} />;
}

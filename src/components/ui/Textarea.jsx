import { classNames } from "./classNames.js";

export default function Textarea({ className, ...props }) {
  return <textarea className={classNames("textarea", className)} {...props} />;
}

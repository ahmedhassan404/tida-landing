import { classNames } from "../ui/classNames.js";

export default function LayoutGrid({ className, ...props }) {
  return <div className={classNames("layout-grid", className)} {...props} />;
}

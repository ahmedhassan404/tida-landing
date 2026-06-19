import { classNames } from "../ui/classNames.js";

export default function Marquee({ children, className, pauseOnHover = true }) {
  return (
    <div className={classNames("marquee", className)}>
      <div className={classNames("marquee-track", pauseOnHover && "pause-on-hover")}>
        {children}
      </div>
    </div>
  );
}

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { classNames } from "./classNames.js";

export default function Separator({ className, orientation = "horizontal", ...props }) {
  return (
    <SeparatorPrimitive.Root
      className={classNames("separator", `separator-${orientation}`, className)}
      orientation={orientation}
      {...props}
    />
  );
}

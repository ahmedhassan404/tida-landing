import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { classNames } from "./classNames.js";

const buttonVariants = cva("button", {
  variants: {
    size: {
      default: "button-default",
      icon: "button-icon",
      sm: "button-sm",
    },
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      ghost: "button-ghost",
      outline: "button-outline",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "primary",
  },
});

export function Button({
  asChild = false,
  children,
  className,
  size,
  type = "button",
  variant,
  ...props
}) {
  const Component = asChild ? Slot : "button";
  const componentProps = asChild ? props : { type, ...props };
  return (
    <Component
      className={classNames(buttonVariants({ size, variant }), className)}
      {...componentProps}
    >
      {children}
    </Component>
  );
}

export function ButtonLink({ children, className, size, variant, ...props }) {
  return (
    <Button asChild className={className} size={size} variant={variant}>
      <a {...props}>{children}</a>
    </Button>
  );
}

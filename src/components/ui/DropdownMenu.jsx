/* eslint-disable react-refresh/only-export-components */
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { classNames } from "./classNames.js";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({ className, sideOffset = 8, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={classNames("dropdown-content", className)}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ checked, children, className, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      className={classNames("dropdown-item", className)}
      {...props}
    >
      <span>{children}</span>
      {checked && <Check size={15} />}
    </DropdownMenuPrimitive.Item>
  );
}

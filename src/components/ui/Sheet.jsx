/* eslint-disable react-refresh/only-export-components */
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { classNames } from "./classNames.js";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;

export function SheetContent({ children, className, closeLabel, side = "right", ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="sheet-overlay" />
      <DialogPrimitive.Content
        className={classNames("sheet-content", `sheet-${side}`, className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="sheet-close" aria-label={closeLabel}>
          <X size={19} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={classNames("sheet-title", className)} {...props} />;
}

export function SheetDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={classNames("sheet-description", className)}
      {...props}
    />
  );
}

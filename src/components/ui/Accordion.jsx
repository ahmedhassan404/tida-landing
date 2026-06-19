import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { classNames } from "./classNames.js";

export function Accordion({ className, ...props }) {
  return <AccordionPrimitive.Root className={classNames("accordion", className)} {...props} />;
}

export function AccordionItem({ className, ...props }) {
  return <AccordionPrimitive.Item className={classNames("accordion-item", className)} {...props} />;
}

export function AccordionTrigger({ children, className, ...props }) {
  return (
    <AccordionPrimitive.Header className="accordion-header">
      <AccordionPrimitive.Trigger
        className={classNames("accordion-trigger", className)}
        {...props}
      >
        {children}
        <ChevronDown className="accordion-chevron" size={19} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ children, className, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={classNames("accordion-content", className)}
      {...props}
    >
      <div className="accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
}

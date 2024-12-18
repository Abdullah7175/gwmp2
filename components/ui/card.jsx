import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a utility for merging class names
import { MdCardMembership } from "react-icons/md";

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </div>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </div>
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

export { Card };

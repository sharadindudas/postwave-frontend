import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-sm rounded-md h-8",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "capitalize border border-cc-primary-2-400 text-cc-primary-2-400",
        blue: "capitalize border-cc-accent-400 bg-cc-background-4 text-cc-accent-400",
        green: "capitalize border-cc-alert-3 bg-cc-background-5 text-cc-alert-3",
        pink: "capitalize border-cc-primary-400 bg-cc-background-7 text-cc-primary-400",
        gray: "capitalize bg-cc-background-1 border-cc-primary-2-400 text-cc-primary-2-400",
        orange: "capitalize bg-cc-background-6 border-cc-secondary-300 text-cc-secondary-300",
        red: "capitalize bg-cc-background-6 border-cc-alert-1 text-cc-alert-1"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants, type BadgeVariant };


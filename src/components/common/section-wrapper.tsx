import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface SectionWrapperProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export default function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  return (
    <div
      {...props}
      className={cn("border border-cc-stroke-100 bg-cc-neutral-100 px-8 py-8 rounded-lg space-y-2 w-full", className)}>
      {children}
    </div>
  );
}

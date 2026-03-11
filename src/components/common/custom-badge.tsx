import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

interface CustomBadgeProps extends ComponentProps<typeof Badge> {
  variant?: BadgeVariant;
  style?: React.CSSProperties;
  className?: string;
  Icon?: LucideIcon;
  iconClassName?: string;
  children?: React.ReactNode;
}

export default function CustomBadge({
  variant,
  style,
  className = "",
  Icon,
  iconClassName = "",
  children,
  ...props
}: CustomBadgeProps) {
  return (
    <Badge variant={variant} style={style} className={cn(className)} {...props}>
      {Icon && <Icon className={cn("size-4!", iconClassName)} />}
      {children}
    </Badge>
  );
}

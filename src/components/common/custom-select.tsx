import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SelectOption = {
  id: string;
  name: string;
};

type CustomSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  items: SelectOption[];
  placeholder?: string;
  selectTriggerClassName?: string;
  disabled?: boolean;
};

export default function CustomSelect({
  value,
  onValueChange,
  onOpenChange,
  items,
  placeholder = "Select an option",
  selectTriggerClassName,
  disabled
}: CustomSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
      disabled={disabled}>
      <SelectTrigger
        className={cn(
          "w-full h-12 bg-cc-neutral-100 text-cc-primary-2 border-cc-stroke-100",
          "data-placeholder:text-cc-primary-2-400",
          selectTriggerClassName
        )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="font-cc-inter">
        {items.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

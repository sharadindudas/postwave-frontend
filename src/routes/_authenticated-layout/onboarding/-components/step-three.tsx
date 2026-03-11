import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import CustomBadge from "@/components/common/custom-badge";
import CustomButton from "@/components/common/custom-button";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import CustomSelect from "@/components/common/custom-select";
import SectionWrapper from "@/components/common/section-wrapper";
import SubmitButton from "@/components/common/submit-button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PUBLISH_PLANS, TOPICS } from "@/data/onboarding";
import { cn } from "@/lib/utils";
import { StepThreeSchema } from "@/schemas/onboarding";
import { showApiError } from "@/utils/common";
import { useForm } from "@tanstack/react-form";
import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function StepThree() {
  const [open, setOpen] = useState<boolean>(false);

  const topics = TOPICS;

  const form = useForm({
    defaultValues: {
      name: "",
      subdomain: "",
      topics: [],
      publish_interval: ""
    } as StepThreeSchema,
    validators: {
      onSubmit: StepThreeSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err) {
        showApiError(err, "Failed to complete onboarding step three");
      }
    }
  });

  return (
    <SectionWrapper className="max-w-4xl">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
        <img
          src={inkwaveLogoText}
          alt="inkwave-logo"
          className="mx-auto mb-4"
        />
        <div className="space-y-1.5">
          <h3 className="common-heading">This is our favorite part! Let&apos;s create your publication.</h3>
          <p className="common-paragraph">By the way, my name is Andrew</p>
          <p className="common-paragraph">I&apos;m part of the inkwave team, here to help you get up and running on the platform.</p>
        </div>

        <div className="space-y-5 my-6">
          <form.Field
            name="name"
            listeners={{
              onChangeDebounceMs: 800,
              onChange: ({ value }) => {
                const subdomain = value?.toLowerCase().split(" ").join("-");
                form.setFieldValue("subdomain", subdomain);
              }
            }}>
            {(field) => (
              <CustomFormField
                label="Publication Name"
                field={field}>
                <CustomInputField
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="text"
                  placeholder="Publication Name"
                  className={cn(!field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1")}
                />
              </CustomFormField>
            )}
          </form.Field>
          <form.Field name="subdomain">
            {(field) => (
              <CustomFormField
                label="Set Subdomain Name"
                field={field}>
                <div className="flex items-center justify-center relative">
                  <CustomInputField
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="Subdomain Name"
                    className={cn(
                      "flex-1 rounded-r-none",
                      !field.state.meta.isValid && "text-cc-alert-1 border-cc-alert-1 focus-visible:border-cc-alert-1"
                    )}
                  />
                  <Input
                    type="text"
                    readOnly
                    value=".inkwave.dev"
                    className="h-12 w-28 rounded-l-none border-l-0 outline-0 focus-visible:border-cc-stroke-100"
                  />
                </div>
              </CustomFormField>
            )}
          </form.Field>

          <form.Field name="topics">
            {(field) => {
              const {
                state: { value, meta },
                handleBlur,
                handleChange
              } = field;
              const { isValid } = meta;

              const handleSelect = (selectedValue: string) => {
                const newSelected = value.includes(selectedValue) ? value.filter((item) => item !== selectedValue) : [...value, selectedValue];

                if (newSelected.length <= 3) {
                  handleChange(newSelected);
                }
              };

              const handleRemove = (valueToRemove: string) => {
                const newSelected = value.filter((item) => item !== valueToRemove);
                handleChange(newSelected);
              };

              const handleOpenChange = (newOpen: boolean) => {
                setOpen(newOpen);
                if (!newOpen) {
                  handleBlur();
                }
              };

              const availableOptions = topics.filter((option) => option.name && !value.includes(option.name));

              return (
                <CustomFormField
                  label="What is your publication about?"
                  field={field}>
                  <Popover
                    open={open}
                    onOpenChange={handleOpenChange}>
                    <PopoverTrigger
                      disabled={value.length >= 3}
                      asChild>
                      <CustomButton
                        variant="outline"
                        aria-expanded={open}
                        className={cn("w-full justify-between min-h-12 py-6 px-2", !isValid && "border-cc-alert-1 text-cc-alert-1")}>
                        <span className="text-cc-primary-2-400 pl-2">Search and select up to 3 content categories</span>
                        <ChevronDown className="size-4 shrink-0 opacity-50" />
                      </CustomButton>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      style={{
                        width: "var(--radix-popover-trigger-width)"
                      }}>
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          disabled={value.length >= 3}
                        />
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {availableOptions.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.name as string}
                              onSelect={() => {
                                handleSelect(option.id as string);
                                if (value.length + 1 >= 3) {
                                  setOpen(false);
                                }
                              }}
                              disabled={value.length >= 3}>
                              <Check className={`mr-2 h-4 w-4 ${value.includes(option.name as string) ? "opacity-100" : "opacity-0"}`} />
                              {option.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        {value.length > 0 && (
                          <div className="border-t p-3 text-xs text-muted-foreground">
                            {value.length}/3 selected
                            {value.length >= 3 && " (maximum reached)"}
                          </div>
                        )}
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {value.map((selectedValue) => {
                        const option = (topics ?? []).find((opt) => opt.id === selectedValue);
                        return (
                          <CustomBadge
                            key={selectedValue}
                            variant="outline">
                            {option?.name ?? selectedValue}
                            <button
                              type="button"
                              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleRemove(selectedValue);
                                }
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              aria-label="Remove selected topic">
                              <X
                                className="size-3.5 text-muted-foreground hover:text-foreground"
                                onClick={() => handleRemove(selectedValue)}
                              />
                            </button>
                          </CustomBadge>
                        );
                      })}
                    </div>
                  )}
                </CustomFormField>
              );
            }}
          </form.Field>

          <form.Field name="publish_interval">
            {(field) => (
              <CustomFormField
                label="How often do you plan to publish"
                field={field}>
                <CustomSelect
                  value={field.state.value ?? ""}
                  onValueChange={field.handleChange}
                  onOpenChange={(open) => !open && field.handleBlur()}
                  items={PUBLISH_PLANS}
                  placeholder="Select an option"
                  selectTriggerClassName="w-full"
                />
              </CustomFormField>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.isValid, state.isSubmitting]}
          children={([isValid, isSubmitting]) => (
            <SubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              className="w-full"
              children="Continue"
            />
          )}
        />
      </form>
    </SectionWrapper>
  );
}

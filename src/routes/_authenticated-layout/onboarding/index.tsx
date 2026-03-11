import inkwaveLogoText from "@/assets/inkwave-logo-text.svg";
import CustomFormField from "@/components/common/custom-form-field";
import CustomInputField from "@/components/common/custom-input-field";
import CustomSelect from "@/components/common/custom-select";
import SectionWrapper from "@/components/common/section-wrapper";
import SubmitButton from "@/components/common/submit-button";
import { Input } from "@/components/ui/input";
import { Tags, TagsContent, TagsEmpty, TagsGroup, TagsInput, TagsItem, TagsList, TagsTrigger, TagsValue } from "@/components/ui/tags";
import { PUBLISH_PLANS, TOPICS } from "@/data/onboarding";
import { useCreatePublication } from "@/hooks/mutations/use-create-publication";
import { cn } from "@/lib/utils";
import { CreatePublicationSchema } from "@/schemas/publications";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated-layout/onboarding/")({
  beforeLoad: async ({ context }) => {
    if (context.user?.isOnboarded) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent
});

function RouteComponent() {
  const { mutateAsync } = useCreatePublication();

  const form = useForm({
    defaultValues: {
      name: "",
      subdomain: "",
      topics: [],
      publish_interval: ""
    } as CreatePublicationSchema,
    validators: {
      onSubmit: CreatePublicationSchema
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    }
  });

  return (
    <div className="bg-cc-background-2 min-h-screen flex flex-col items-center justify-center">
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
                  label="Subdomain Name"
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
                const selected = field.state.value;

                const handleSelect = (topicId: string) => {
                  const next = selected.includes(topicId) ? selected.filter((id) => id !== topicId) : [...selected, topicId];

                  if (next.length <= 3) {
                    field.handleChange(next);
                  }
                };

                const handleRemove = (topicId: string) => {
                  field.handleChange(selected.filter((id) => id !== topicId));
                };

                return (
                  <CustomFormField
                    label="What is your publication about?"
                    field={field}>
                    <Tags>
                      <TagsTrigger className="h-12">
                        {selected.map((id) => (
                          <TagsValue
                            key={id}
                            onRemove={() => handleRemove(id)}>
                            {TOPICS.find((t) => t.id === id)?.name}
                          </TagsValue>
                        ))}
                      </TagsTrigger>
                      <TagsContent>
                        <TagsInput placeholder="Search topics..." />
                        <TagsList>
                          <TagsEmpty />
                          <TagsGroup>
                            {TOPICS.map((topic) => (
                              <TagsItem
                                key={topic.id}
                                value={topic.id}
                                onSelect={handleSelect}>
                                {topic.name}
                                {selected.includes(topic.id) && (
                                  <CheckIcon
                                    className="text-cc-neutral-100"
                                    size={14}
                                  />
                                )}
                              </TagsItem>
                            ))}
                          </TagsGroup>
                        </TagsList>
                      </TagsContent>
                    </Tags>
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
                children="Submit"
              />
            )}
          />
        </form>
      </SectionWrapper>
    </div>
  );
}

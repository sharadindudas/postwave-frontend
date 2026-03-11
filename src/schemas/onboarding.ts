import * as v from "valibot";

const nullableString = v.optional(v.nullable(v.pipe(v.string(), v.trim(), v.maxLength(500))));

export const UpdateUserOnboardingSchema = v.object({
  isOnboarded: v.optional(v.boolean()),
  onboardingStep: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  journey: nullableString,
  platformsUsed: nullableString,
  source: nullableString,
  goals: nullableString
});
export type UpdateUserOnboardingSchema = v.InferInput<typeof UpdateUserOnboardingSchema>;

export const StepOneSchema = v.object({
  journey: v.pipe(v.string(), v.nonEmpty("Please provide a journey"))
});
export type StepOneSchema = v.InferInput<typeof StepOneSchema>;

export const StepTwoSchema = v.object({
  platforms: v.pipe(v.array(v.string()), v.minLength(1, "Please select at least one platform"))
});
export type StepTwoSchema = v.InferInput<typeof StepTwoSchema>;

export const StepThreeSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please provide a publication name")),
  subdomain: v.pipe(v.string(), v.nonEmpty("Please provide a subdomain name")),
  topics: v.pipe(
    v.array(v.pipe(v.string(), v.trim())),
    v.minLength(1, "Please select at least one category"),
    v.maxLength(3, "Please select maximum 3 categories")
  ),
  publish_interval: v.pipe(v.string(), v.nonEmpty("Please provide a publish plan"))
});
export type StepThreeSchema = v.InferInput<typeof StepThreeSchema>;

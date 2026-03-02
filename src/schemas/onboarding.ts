import * as v from "valibot";

export const StepOneSchema = v.object({
  journey: v.pipe(v.string(), v.nonEmpty("Please provide a journey"))
});
export type StepOneSchema = v.InferInput<typeof StepOneSchema>;

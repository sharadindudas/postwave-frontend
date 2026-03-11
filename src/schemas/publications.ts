import * as v from "valibot";

export const CreatePublicationSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please provide a publication name")),
  subdomain: v.pipe(v.string(), v.nonEmpty("Please provide a subdomain name")),
  topics: v.pipe(
    v.array(v.pipe(v.string(), v.trim())),
    v.minLength(1, "Please select at least one category"),
    v.maxLength(3, "Please select maximum 3 categories")
  ),
  publish_interval: v.pipe(v.string(), v.nonEmpty("Please provide a publish plan"))
});
export type CreatePublicationSchema = v.InferInput<typeof CreatePublicationSchema>;

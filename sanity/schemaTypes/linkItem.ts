import { defineField, defineType } from "sanity";

export const linkItem = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: "Internal path (e.g. /calendar) or external URL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Optional thumbnail for this link",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url", media: "image" },
  },
});

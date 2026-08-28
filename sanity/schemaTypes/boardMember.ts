import { defineField, defineType } from "sanity";

export const boardMember = defineType({
  name: "boardMember",
  title: "Board Member",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "President", "VP of Events"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});

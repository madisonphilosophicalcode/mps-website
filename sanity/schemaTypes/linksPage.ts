import { defineField, defineType } from "sanity";

export const linksPage = defineType({
  name: "linksPage",
  title: "Links Page",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Links Page" }),
  },
});

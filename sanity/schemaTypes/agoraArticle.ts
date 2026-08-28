import { defineField, defineType } from "sanity";

export const agoraArticle = defineType({
  name: "agoraArticle",
  title: "Article",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body (Markdown)",
      type: "text",
      rows: 20,
      description: "Full article text, written in Markdown.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author" },
  },
});

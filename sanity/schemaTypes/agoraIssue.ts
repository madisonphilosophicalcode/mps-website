import { defineField, defineType } from "sanity";

export const agoraIssue = defineType({
  name: "agoraIssue",
  title: "Agora Issue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Agora Spring 2026"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
      options: { list: ["Fall", "Spring"] },
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "topicsTeaser",
      title: "Topics Teaser",
      type: "text",
      rows: 3,
      description: "Short summary of topics shown on the homepage card",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
    }),
    defineField({
      name: "preface",
      title: "Preface (Markdown)",
      type: "text",
      rows: 15,
      description:
        "Editor's preface/foreword for the issue, written in Markdown. Shown under the title on the issue page.",
    }),
    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [{ type: "agoraArticle" }],
    }),
  ],
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [
        { field: "year", direction: "desc" },
        { field: "season", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "topicsTeaser", media: "coverImage" },
  },
});

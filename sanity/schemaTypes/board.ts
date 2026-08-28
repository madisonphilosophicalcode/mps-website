import { defineField, defineType } from "sanity";

export const board = defineType({
  name: "board",
  title: "Board",
  type: "document",
  fields: [
    defineField({
      name: "semester",
      title: "Semester",
      type: "string",
      options: { list: ["Spring", "Fall"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "members",
      title: "Members",
      description: "Drag to reorder — this order is used for display.",
      type: "array",
      of: [{ type: "boardMember" }],
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "newestFirst",
      by: [
        { field: "year", direction: "desc" },
        { field: "semester", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { semester: "semester", year: "year", members: "members" },
    prepare: ({ semester, year, members }) => ({
      title: `${semester ?? "?"} ${year ?? "?"}`,
      subtitle: `${(members ?? []).length} member(s)`,
    }),
  },
});

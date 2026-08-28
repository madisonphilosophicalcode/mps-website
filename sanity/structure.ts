import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Links Page")
        .id("linksPage")
        .child(S.document().schemaType("linksPage").documentId("linksPage")),
      S.divider(),
      S.documentTypeListItem("agoraIssue").title("Agora Issues"),
      S.documentTypeListItem("galleryImage").title("Gallery Images"),
      S.documentTypeListItem("board").title("Boards"),
    ]);

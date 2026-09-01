import type { JsonLd as JsonLdPayload } from "@/lib/structuredData";

/**
 * Renders a schema.org payload as an inline ld+json script.
 *
 * `<` is escaped to its unicode form so a stray HTML tag inside CMS-authored
 * text cannot break out of the script element.
 */
export default function JsonLd({ data }: { data: JsonLdPayload }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

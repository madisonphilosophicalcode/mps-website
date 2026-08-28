import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { projectId, dataset } from "@/lib/sanity/client";

const builder = createImageUrlBuilder({ projectId: projectId ?? "", dataset });

export function urlFor(source: Image) {
  return builder.image(source);
}

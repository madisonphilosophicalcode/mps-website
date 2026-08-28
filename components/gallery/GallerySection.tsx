import Carousel from "@/components/gallery/Carousel";
import { galleryImages as fallbackGalleryImages } from "@/data/gallery";
import { getGalleryImages } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export default async function GallerySection() {
  const sanityGalleryImages = await getGalleryImages();

  const galleryImages =
    sanityGalleryImages.length > 0
      ? sanityGalleryImages.map((img) => ({
          label: img.caption ?? "MPS gathering photo",
          src: urlFor(img.image).width(800).height(1000).url(),
        }))
      : fallbackGalleryImages;

  return <Carousel images={galleryImages} />;
}

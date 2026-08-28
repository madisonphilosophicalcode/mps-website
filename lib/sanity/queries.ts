import { cache } from "react";
import type { Image } from "sanity";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";

export interface SanityLinkItem {
  label: string;
  url: string;
  image?: Image;
}

export interface SanitySocialLink {
  platform: string;
  url: string;
}

export interface SanityLinksPage {
  links: SanityLinkItem[];
  socialLinks: SanitySocialLink[];
}

export interface SanityAgoraArticle {
  title: string;
  author: string;
  body?: string;
}

export interface SanityAgoraIssue {
  title: string;
  slug: string;
  season?: string;
  year?: number;
  topicsTeaser?: string;
  coverImage?: Image;
  preface?: string;
  pdf?: { asset?: { url: string } };
  articles?: SanityAgoraArticle[];
}

export interface SanityGalleryImage {
  image: Image;
  caption?: string;
}

export interface SanityBoardMember {
  name: string;
  role: string;
  image?: Image;
}

export interface SanityBoard {
  semester: string;
  year: number;
  members: SanityBoardMember[];
}

export const getLinksPage = cache(async (): Promise<SanityLinksPage | null> => {
  if (!sanityConfigured) return null;
  try {
    return await sanityClient!.fetch(
      `*[_type == "linksPage"][0]{ links, socialLinks }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Failed to fetch linksPage from Sanity:", error);
    return null;
  }
});

export const getAgoraIssues = cache(async (): Promise<SanityAgoraIssue[]> => {
  if (!sanityConfigured) return [];
  try {
    return await sanityClient!.fetch(
      `*[_type == "agoraIssue"] | order(year desc, season desc){
        title,
        "slug": slug.current,
        season,
        year,
        topicsTeaser,
        coverImage,
        pdf{ asset->{ url } },
        articles
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Failed to fetch agoraIssues from Sanity:", error);
    return [];
  }
});

export const getAgoraIssueBySlug = cache(
  async (slug: string): Promise<SanityAgoraIssue | null> => {
    if (!sanityConfigured) return null;
    try {
      return await sanityClient!.fetch(
        `*[_type == "agoraIssue" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        season,
        year,
        coverImage,
        preface,
        pdf{ asset->{ url } },
        articles
      }`,
        { slug },
        { next: { revalidate: 60 } },
      );
    } catch (error) {
      console.error("Failed to fetch agoraIssue from Sanity:", error);
      return null;
    }
  },
);

export const getGalleryImages = cache(
  async (): Promise<SanityGalleryImage[]> => {
    if (!sanityConfigured) return [];
    try {
      return await sanityClient!.fetch(
        `*[_type == "galleryImage"] | order(order asc){ image, caption }`,
        {},
        { next: { revalidate: 60 } },
      );
    } catch (error) {
      console.error("Failed to fetch galleryImages from Sanity:", error);
      return [];
    }
  },
);

export const getBoards = cache(async (): Promise<SanityBoard[]> => {
  if (!sanityConfigured) return [];
  try {
    return await sanityClient!.fetch(
      `*[_type == "board"]{ semester, year, members }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Failed to fetch boards from Sanity:", error);
    return [];
  }
});

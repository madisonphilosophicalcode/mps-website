import { site } from "@/data/site";

export interface BioLink {
  label: string;
  href: string;
  external?: boolean;
  image?: string;
}

export interface BioSocialLink {
  platform: string;
  url: string;
}

export const bioLinks: BioLink[] = [
  { label: "Join Our Email List", href: site.mailingListUrl },
  { label: "Meetings & Calendar", href: "/calendar" },
  { label: "Agora Journal", href: "/agora" },
  { label: "Resources", href: "/resources" },
  { label: "About MPS", href: "/about" },
  { label: "Full Website", href: "/" },
];

export const fallbackSocialLinks: BioSocialLink[] = [
  { platform: "instagram", url: site.instagramUrl },
];

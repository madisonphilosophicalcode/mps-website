function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "http://localhost:3000";
  return /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
}

export const site = {
  name: "MPS",
  url: resolveSiteUrl(),
  tagline: "Dedicated to philosophical discourse, and community-building.",
  instagramUrl: "https://www.instagram.com/madisonphilosophicalsociety",
  whatsappUrl: "https://chat.whatsapp.com/DIi3m9tgHB04sGjOefDfmI",
  email: "madisonphilosophicalsociety@gmail.com",
  mailingListUrl: "/subscribe",
};

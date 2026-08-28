export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Calendar", href: "/calendar" },
  { label: "Agora", href: "/agora" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const browseLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Meetings", href: "/calendar" },
  { label: "Journal", href: "/agora" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

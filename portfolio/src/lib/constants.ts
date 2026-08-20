export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return basePath && path.startsWith("/") ? `${basePath}${path}` : path;
}

export const siteConfig = {
  name: "Osama Kolachi", shortName: "OSAMA.", title: "Osama Kolachi — Creative Developer",
  description: "Creative developer building digital systems at the intersection of engineering, art direction and emerging technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://osamataskin.github.io/Personal_Portfolio-", email: "osamakolachi98@gmail.com", location: "Dubai — UAE",
  socials: {
    linkedin: "https://www.linkedin.com/in/osama-kolachi?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
};

export const navItems = [
  { href: "/work", label: "Work" }, { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" }, { href: "/contact", label: "Contact" },
];

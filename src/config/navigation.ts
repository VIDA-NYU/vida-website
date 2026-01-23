export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Mission", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  // { label: "Playground", href: "/playground" }, // temporarily hidden
  { label: "Publications", href: "/publications" },
  { label: "Lab Atlas", href: "/lab-atlas" },
];

export const moreNav: NavItem[] = [
  { label: "Log", href: "/log" },
  { label: "Open Lab", href: "/open-lab" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

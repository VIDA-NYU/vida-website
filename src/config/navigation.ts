export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "People", href: "/people" },
];

export const moreNav: NavItem[] = [
  { label: "News", href: "/log" },
  { label: "Solutions", href: "/open-lab" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

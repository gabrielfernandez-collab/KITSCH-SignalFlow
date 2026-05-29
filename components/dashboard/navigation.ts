import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Megaphone,
  Radar,
  Tags,
  UsersRound
} from "lucide-react";

export type NavigationGroup = {
  label: string;
  items: Array<{
    href: string;
    label: string;
    icon: typeof BarChart3;
  }>;
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Intelligence",
    items: [
      { href: "/", label: "Executive Dashboard", icon: BarChart3 },
      { href: "/weekly-brief-generator", label: "Weekly Brief Generator", icon: FileText }
    ]
  },
  {
    label: "Analysis",
    items: [
      { href: "/product-launch-radar", label: "Product Launch Radar", icon: Radar },
      { href: "/pricing-intelligence", label: "Pricing Intelligence", icon: Tags },
      { href: "/campaign-intelligence", label: "Campaign Intelligence", icon: Megaphone }
    ]
  },
  {
    label: "Competitors",
    items: [{ href: "/competitors", label: "Competitors", icon: UsersRound }]
  },
  {
    label: "Operations",
    items: [{ href: "/assessment", label: "Assessment", icon: ClipboardCheck }]
  }
];

export function isNavItemActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

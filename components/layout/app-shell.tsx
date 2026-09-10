"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Gauge, LayoutDashboard, MessageSquareWarning, Settings, Sparkles } from "lucide-react";

const navigation = [
  ["/", "Home", LayoutDashboard],
  ["/copilot", "Growth Copilot", Sparkles],
  ["/objections", "Objections", MessageSquareWarning],
  ["/campaigns", "Campaigns", BarChart3],
  ["/playbook", "Playbook", BookOpen],
  ["/analytics", "Local Activity", Gauge],
  ["/settings", "Settings", Settings]
] as const;

export function AppShell() {
  const pathname = usePathname();
  return <aside className="sidebar"><Link href="/" className="brand"><span className="brand-dot">↗</span><div><strong>Growth Copilot</strong><small>DoorDash AM</small></div></Link><nav>{navigation.map(([href, label, Icon]) => <Link className={pathname === href ? "nav-item active" : "nav-item"} href={href} key={href}><Icon size={18} />{label}</Link>)}</nav><div className="sidebar-footer"><span className="status-dot" /> Mock AI · Local mode</div></aside>;
}

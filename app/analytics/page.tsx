"use client";

import { BarChart3, Copy, MousePointerClick, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";

const topCampaigns = [{ name: "Sponsored Listings", value: 38 }, { name: "Happy Hour", value: 24 }, { name: "Try With Discount", value: 19 }, { name: "Spend $X, Get $Y", value: 12 }];
const objections = [{ name: "Budget concern", value: 31 }, { name: "Profitability", value: 25 }, { name: "Prior ad results", value: 18 }, { name: "Capacity", value: 14 }];

export default function AnalyticsPage() {
  return <main className="app"><AppShell /><section className="workspace"><PageHeader eyebrow="DEMO / LOCAL ACTIVITY" title="Practice and usage signals" description="This page shows illustrative local activity only. It is not DoorDash merchant-performance reporting." /><section className="metric-grid"><Metric icon={<Sparkles size={19} />} value="126" label="Recommendations generated" note="Demo activity" /><Metric icon={<MousePointerClick size={19} />} value="42" label="Talk tracks copied" note="Demo activity" /><Metric icon={<Copy size={19} />} value="64" label="Objections reviewed" note="Demo activity" /><Metric icon={<BarChart3 size={19} />} value="18" label="Next actions selected" note="Demo activity" /></section><section className="analytics-grid"><ChartCard title="Top recommended campaigns" data={topCampaigns} /><ChartCard title="Most common objections" data={objections} /><article className="panel"><p className="eyebrow">INTERPRETATION</p><h2>Use activity to coach workflow quality</h2><p className="detail-lead">The goal is not to maximize clicks. It is to consistently identify the right merchant goal, use a documented talk track, and finish with a clear next action.</p><div className="analytics-note"><strong>Local-only MVP</strong><span>Future integrations can populate this view with approved operational analytics.</span></div></article></section></section></main>;
}
function Metric({ icon, value, label, note }: { icon: ReactNode; value: string; label: string; note: string }) { return <article className="metric-card"><div>{icon}</div><strong>{value}</strong><span>{label}</span><small>{note}</small></article>; }
function ChartCard({ title, data }: { title: string; data: { name: string; value: number }[] }) { return <article className="panel chart-card"><p className="eyebrow">LOCAL ACTIVITY</p><h2>{title}</h2><div className="bar-list">{data.map((item) => <div key={item.name}><div className="bar-meta"><span>{item.name}</span><strong>{item.value}</strong></div><div className="bar-track"><i style={{ width: `${item.value * 2.2}%` }} /></div></div>)}</div></article>; }

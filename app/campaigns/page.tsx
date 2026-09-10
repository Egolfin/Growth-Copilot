"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { campaigns } from "@/data/campaigns";

export default function CampaignsPage() {
  const [category, setCategory] = useState<"all" | "ads" | "promotion" | "loyalty">("all");
  const [selectedId, setSelectedId] = useState(campaigns[0].id);
  const visible = useMemo(() => category === "all" ? campaigns : campaigns.filter((item) => item.category === category), [category]);
  const selected = campaigns.find((item) => item.id === selectedId) ?? campaigns[0];
  return <main className="app"><AppShell /><section className="workspace"><PageHeader eyebrow="CAMPAIGN LIBRARY" title="Choose the right growth lever" description="Browse approved core campaigns. Availability, eligibility, and current terms must be verified before presenting an offer." /><div className="tabs" role="tablist">{(["all", "ads", "promotion", "loyalty"] as const).map((item) => <button role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={category === item ? "tab active" : "tab"} key={item}>{item === "all" ? "All campaigns" : item}</button>)}</div><div className="campaign-layout"><section className="campaign-list">{visible.map((item) => <button onClick={() => setSelectedId(item.id)} className={selectedId === item.id ? "campaign-row selected" : "campaign-row"} key={item.id}><div><span className="mini-label">{item.category}</span><strong>{item.name}</strong><p>{item.jobToBeDone}</p></div><ArrowRight size={16} /></button>)}</section><article className="campaign-detail"><p className="eyebrow">CAMPAIGN OVERVIEW</p><h2>{selected.name}</h2>{selected.alias && <p className="alias">Also referenced as {selected.alias}</p>}<p className="detail-lead">{selected.explanation}</p><div className="detail-grid"><Detail title="Best for" items={selected.bestFor} /><Detail title="Operational fit" items={selected.operationalConsiderations.length ? selected.operationalConsiderations : ["No specific operational consideration documented."]} /><Detail title="Budget and setup" items={selected.budgetConsiderations} /><Detail title="Discovery question" items={selected.talkTrack.discovery} /></div><section className="pitch-box"><div><p className="mini-label">SOURCE-GROUNDED PITCH</p><p>{selected.talkTrack.pitch[0]}</p></div><button className="button primary">Use in Copilot</button></section>{selected.requiresVerification && <div className="verification"><ShieldCheck size={17} /><span>Verify current eligibility, configuration, and terms before positioning this campaign.</span></div>}<p className="source"><CheckCircle2 size={13} /> Source: {selected.source.sourceDocument} · {selected.source.sourceSection} · p. {selected.source.sourcePage}</p></article></div></section></main>;
}
function Detail({ title, items }: { title: string; items: string[] }) { return <div className="detail-card"><p className="mini-label">{title}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>; }

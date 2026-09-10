"use client";

import { useState } from "react";
import { Copy, Lightbulb, MessageCircleQuestion } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/common/page-header";
import { objections } from "@/data/objections";

export default function ObjectionsPage() {
  const [active, setActive] = useState(objections[0].id);
  const item = objections.find((entry) => entry.id === active) ?? objections[0];
  return <main className="app"><AppShell /><section className="workspace"><PageHeader eyebrow="OBJECTION PLAYBOOK" title="Respond with clarity, not pressure" description="Validate first, uncover the real concern, then connect the next move to the merchant’s stated goal." /><div className="objection-layout"><aside className="objection-list">{objections.map((entry) => <button key={entry.id} className={entry.id === active ? "objection-nav selected" : "objection-nav"} onClick={() => setActive(entry.id)}><span>{entry.title}</span><small>{entry.possibleConcern}</small></button>)}</aside><article className="objection-detail"><p className="eyebrow">CONSULTATIVE RESPONSE</p><h2>{item.title}</h2><div className="insight"><Lightbulb size={17} /><div><span>Possible underlying concern</span><p>{item.possibleConcern}</p></div></div><div className="flow-grid"><FlowStep number="01" title="Validate" text={item.validate[0]} /><FlowStep number="02" title="Discover" text={item.discovery.join(" ")} /><FlowStep number="03" title="Confirm" text={item.confirm[0]} /><FlowStep number="04" title="Respond" text={item.response[0]} /><FlowStep number="05" title="Next move" text={item.nextAction} /><FlowStep number="06" title="Close" text={item.close[0]} /></div><div className="bridge"><MessageCircleQuestion size={17} /><div><strong>Campaign bridge</strong><p>{item.campaignBridge.length ? `After discovery, review: ${item.campaignBridge.join(" · ")}.` : "Continue discovery before positioning a campaign."}</p></div></div><p className="source">Source: {item.source.sourceDocument} · p. {item.source.sourcePage || "n/a"}</p></article></div></section></main>;
}
function FlowStep({ number, title, text }: { number: string; title: string; text: string }) { const [copied, setCopied] = useState(false); return <section className="flow-step"><div><span>{number}</span><strong>{title}</strong></div><p>{text}</p><button className="copy-tiny" onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 900); }}><Copy size={13} /> {copied ? "Copied" : "Copy"}</button></section>; }

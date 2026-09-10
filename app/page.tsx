"use client";

import { useMemo, useState } from "react";
import { Bot, Copy, Search, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { campaigns, campaignById } from "@/data/campaigns";
import { objections } from "@/data/objections";
import { sampleMerchants } from "@/data/sample-merchants";
import { MockCopilotProvider } from "@/lib/mock-copilot-provider";
import { fitLabel, recommendCampaigns } from "@/lib/recommendation-engine";
import type { Goal } from "@/types/campaign";
import type { ObjectionId } from "@/types/objection";

const provider = new MockCopilotProvider();
const goalOptions: { id: Goal; label: string }[] = [
  { id: "visibility", label: "More visibility" }, { id: "new_customers", label: "New customers" }, { id: "bigger_orders", label: "Bigger orders" }, { id: "repeat_customers", label: "Repeat customers" }, { id: "overall_sales", label: "Overall sales" }, { id: "slow_daypart", label: "Fill slow periods" }, { id: "specific_item", label: "Move an item" }, { id: "automation", label: "Simpler marketing" }, { id: "delivery_friction", label: "Delivery-fee friction" }
];

function CopyButton({ value }: { value: string }) { const [copied, setCopied] = useState(false); return <button className="icon-button" aria-label="Copy text" onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }}><Copy size={14} />{copied ? "Copied" : "Copy"}</button>; }
function Source({ text }: { text: string }) { return <p className="source"><ShieldCheck size={13} /> Source: {text}</p>; }

export default function Home() {
  const [merchant, setMerchant] = useState(sampleMerchants[0]);
  const [selectedObjection, setSelectedObjection] = useState<ObjectionId>("BUDGET");
  const [query, setQuery] = useState("");
  const [liveMode, setLiveMode] = useState(false);
  const recommendations = useMemo(() => recommendCampaigns(merchant), [merchant]);
  const primary = recommendations[0];
  const secondary = recommendations[1];
  const objection = provider.analyzeObjection(objections.find((item) => item.id === selectedObjection)?.title ?? "");
  const track = provider.generateTalkTrack(merchant);
  const results = query.length > 1 ? [...campaigns.filter((item) => `${item.name} ${item.alias ?? ""} ${item.jobToBeDone}`.toLowerCase().includes(query.toLowerCase())), ...objections.filter((item) => `${item.title} ${item.possibleConcern}`.toLowerCase().includes(query.toLowerCase()))] : [];
  const setGoal = (primaryGoal: Goal) => setMerchant((current) => ({ ...current, primaryGoal }));

  return <main className={liveMode ? "app live" : "app"}>
      {!liveMode && <AppShell />}
    <section className="workspace">
      <header className="topbar"><div><p className="eyebrow">INTERNAL DECISION SUPPORT</p><h1>{liveMode ? "Live Call Mode" : "DoorDash AM Growth Copilot"}</h1></div><div className="top-actions"><div className="search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search playbook" aria-label="Search playbook" />{results.length > 0 && <div className="search-results">{results.slice(0, 5).map((item) => <button key={item.id} onClick={() => setQuery("")}>{"name" in item ? item.name : item.title}</button>)}</div>}</div><button className="button secondary" onClick={() => setLiveMode(!liveMode)}>{liveMode ? "Exit call" : "Start live call"}</button><div className="avatar">EG</div></div></header>
      {!liveMode && <section className="hero"><div><p className="eyebrow">GOOD AFTERNOON</p><h2>Let’s find the next best growth conversation.</h2><p>Choose a merchant goal, get a documented recommendation, and move confidently through the call.</p></div><div className="hero-stat"><span>Current session</span><strong>{merchant.storeName}</strong><small>{merchant.cuisine} · {merchant.primaryGoal?.replaceAll("_", " ")}</small></div></section>}
      <section className="copilot-grid">
        <article className="panel context"><div className="panel-heading"><div><p className="eyebrow">01 · DIAGNOSE</p><h2>Merchant context</h2></div><select aria-label="Load demo scenario" value={merchant.id} onChange={(e) => setMerchant(sampleMerchants.find((item) => item.id === e.target.value) ?? sampleMerchants[0])}>{sampleMerchants.map((item) => <option value={item.id} key={item.id}>{item.storeName}</option>)}</select></div><label>Store name<input value={merchant.storeName} onChange={(e) => setMerchant({ ...merchant, storeName: e.target.value })} /></label><label>Cuisine<input value={merchant.cuisine ?? ""} onChange={(e) => setMerchant({ ...merchant, cuisine: e.target.value })} /></label><p className="field-label">What outcome matters most?</p><div className="chips">{goalOptions.map((goal) => <button onClick={() => setGoal(goal.id)} className={merchant.primaryGoal === goal.id ? "chip selected" : "chip"} key={goal.id}>{goal.label}</button>)}</div><p className="field-label">Investment comfort</p><div className="chips">{(["high", "medium", "low"] as const).map((value) => <button key={value} onClick={() => setMerchant({ ...merchant, budgetSensitivity: value })} className={merchant.budgetSensitivity === value ? "chip selected" : "chip"}>{value === "high" ? "Very cautious" : value === "medium" ? "Moderate" : "Growth focused"}</button>)}</div><p className="field-label">Operational context</p><button className={merchant.operationalConstraints.includes("peak_full") ? "chip selected" : "chip"} onClick={() => setMerchant({ ...merchant, operationalConstraints: merchant.operationalConstraints.includes("peak_full") ? [] : ["peak_full"] })}>Peak periods already full</button><div className="notice"><ShieldCheck size={16} /><span>Recommendations are source-grounded. Current terms still require verification.</span></div></article>
        <article className="panel recommendation"><div className="panel-heading"><div><p className="eyebrow">02 · MATCH THE TOOL</p><h2>Recommended growth strategy</h2></div><span className="live-indicator">RULE ENGINE</span></div>{!primary ? <div className="empty"><Sparkles size={24} /><h3>Not enough information yet</h3><p>Select the merchant’s primary goal to generate a recommendation.</p></div> : <><div className="recommendation-card"><div className="recommendation-top"><div><p className="label">PRIMARY RECOMMENDATION</p><h3>{campaignById(primary.campaignId)?.name}</h3>{campaignById(primary.campaignId)?.alias && <p className="alias">Also referenced as {campaignById(primary.campaignId)?.alias}</p>}</div><div className="score"><strong>{primary.fitScore}</strong><span>{fitLabel(primary.fitScore)}</span></div></div><p className="campaign-copy">{campaignById(primary.campaignId)?.explanation}</p><p className="field-label">Why this recommendation?</p><ul>{primary.whyRecommended.map((reason) => <li key={reason}>{reason}</li>)}</ul><div className="tradeoff"><strong>Tradeoff to consider</strong><p>{primary.tradeoffs[0]}</p></div><Source text={primary.sourceIds[0]} /></div>{secondary && <div className="secondary-card"><p className="label">SECONDARY OPTION</p><strong>{campaignById(secondary.campaignId)?.name}</strong><span>{secondary.goalAlignment}</span></div>}<div className="why-not"><p className="field-label">Why not the alternatives?</p>{primary.whyNot.map((reason) => <p key={reason}>{reason}</p>)}</div><div className="recommendation-actions"><button className="button primary">Use this recommendation</button><button className="button secondary">Compare alternatives</button></div></>}</article>
        <article className="panel assistant"><div className="panel-heading"><div><p className="eyebrow">03 · MAKE IT CONCRETE</p><h2>Talk track & objections</h2></div><Bot size={22} className="bot-icon" /></div><section className="talk-track"><div className="script-head"><strong>Suggested talk track</strong><CopyButton value={`${track.discovery}\n${track.value}\n${track.close}`} /></div><div><span>DISCOVERY</span><p>{track.discovery}</p></div><div><span>VALUE</span><p>{track.value}</p></div><div><span>CLOSE</span><p>{track.close}</p></div></section><section className="objection-section"><p className="field-label">Merchant objection</p><div className="quick-objections">{objections.slice(0, 6).map((item) => <button key={item.id} onClick={() => setSelectedObjection(item.id)} className={selectedObjection === item.id ? "quick active" : "quick"}>{item.title.replace("The ", "").replace("I'm ", "")}</button>)}</div><div className="objection-card"><p className="label">{objection.title}</p><div className="underlying"><span>Possible underlying concern</span><p>{objection.possibleConcern}</p></div><ScriptBlock label="VALIDATE" value={objection.validate[0]} /><ScriptBlock label="DISCOVERY" value={objection.discovery[0]} /><ScriptBlock label="RESPONSE" value={objection.response[0]} /><ScriptBlock label="NEXT MOVE" value={objection.nextAction} /><div className="close-line"><strong>Close</strong><p>{objection.close[0]}</p></div><Source text={`${objection.source.sourceDocument} · p. ${objection.source.sourcePage || "n/a"}`} /></div></section></article>
      </section>
      <footer>Directional planning guidance only. Verify current merchant eligibility, campaign settings, and terms in the approved process before presenting an offer.</footer>
    </section>
  </main>;
}

function ScriptBlock({ label, value }: { label: string; value: string }) { return <div className="script-block"><span>{label}</span><p>{value}</p><CopyButton value={value} /></div>; }

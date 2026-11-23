"use client";

import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { dashboard, type DashboardItem } from "@/config/dashboard";
import { hasPermission } from "@/lib/rbac";

export function ProductDashboard({ roles }: { roles: string[] }) {
  const [items, setItems] = useState<DashboardItem[]>(dashboard.items);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const canManage = hasPermission(roles, dashboard.managePermission);
  const completed = useMemo(
    () => items.filter((item) => item.status.toLowerCase().includes("done") || item.status.toLowerCase().includes("closed")).length,
    [items],
  );

  function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = dashboard.formFields.map((field) => String(data.get(field.name) ?? "").trim());
    const created: DashboardItem = {
      id: Date.now(),
      primary: values[0] || dashboard.modalTitle,
      secondary: values[1] || dashboard.defaultSecondary,
      tertiary: values[2] || dashboard.defaultTertiary,
      status: dashboard.newItemStatus,
      accent: "lime",
    };
    setItems((current) => [created, ...current]);
    setModalOpen(false);
    setNotice(`${dashboard.itemNoun} created and added to the workspace.`);
    event.currentTarget.reset();
  }

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="mono-label">{dashboard.eyebrow}</p>
          <h1>{dashboard.heading}</h1>
          <p>{dashboard.summary}</p>
        </div>
        <div className="heading-actions">
          <button className="secondary-button" onClick={() => setNotice(dashboard.secondaryNotice)}>
            <Database size={15} /> {dashboard.secondaryAction}
          </button>
          {canManage && (
            <button className="primary-button" onClick={() => setModalOpen(true)}>
              <Plus size={16} /> {dashboard.primaryAction}
            </button>
          )}
        </div>
      </header>

      {notice && (
        <div className="notice" role="status">
          <CheckCircle2 size={16} /> {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss"><X size={14} /></button>
        </div>
      )}

      <section className="metric-grid" aria-label={dashboard.metricLabel}>
        {dashboard.metrics.map((metric, index) => (
          <article className={`metric-card ${index === 0 ? "featured" : ""}`} key={metric.label}>
            <div className="metric-top"><span>{metric.label}</span>{index === 0 ? <Activity size={17} /> : index === 1 ? <ArrowUpRight size={17} /> : index === 2 ? <Clock3 size={17} /> : <ShieldCheck size={17} />}</div>
            <strong>{metric.value}</strong>
            <p><span className={metric.tone}>{metric.change}</span> {metric.context}</p>
            {index === 0 ? (
              <div className="mini-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboard.trend} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <defs><linearGradient id="primaryFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#222c62" stopOpacity={0.4}/><stop offset="100%" stopColor="#222c62" stopOpacity={0}/></linearGradient></defs>
                    <XAxis dataKey="label" hide />
                    <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #d8d9d4", borderRadius: 6 }} />
                    <Area type="monotone" dataKey="value" stroke="#222c62" fill="url(#primaryFill)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="progress-track"><span style={{ width: metric.progress }} /></div>
            )}
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="surface schedule-surface">
          <header className="surface-header">
            <div><h2>{dashboard.listTitle}</h2><p>{items.length} visible · {completed} complete</p></div>
            <Activity size={18} />
          </header>
          <div className="record-list">
            {items.map((item) => (
              <article className="record-row" key={item.id}>
                <span className={`event-rail ${item.accent}`} />
                <time>{String(item.id).padStart(2, "0")}</time>
                <div className="record-main"><strong>{item.primary}</strong><span>{item.secondary} · {item.tertiary}</span></div>
                <div className="host-pill"><span>{item.status.slice(0, 2).toUpperCase()}</span>{item.status}</div>
                <button className="icon-button" aria-label={`More actions for ${item.primary}`}><MoreHorizontal size={17} /></button>
              </article>
            ))}
          </div>
          <button className="surface-link" onClick={() => setModalOpen(true)} disabled={!canManage}>
            {dashboard.workspaceAction} <ArrowUpRight size={14} />
          </button>
        </section>

        <div className="side-stack">
          <section className="surface">
            <header className="surface-header"><div><h2>{dashboard.sideTitle}</h2><p>{dashboard.sideSubtitle}</p></div><Users size={18} /></header>
            <div className="pool-list">
              {dashboard.sideItems.map((item, index) => (
                <div className="pool" key={item.title}>
                  <span className={`pool-icon ${index === 0 ? "lime" : index === 1 ? "violet" : "cyan"}`}><ShieldCheck size={15} /></span>
                  <div><strong>{item.title}</strong><small>{item.detail}</small></div><b className={item.warning ? "warning" : ""}>{item.value}</b>
                </div>
              ))}
            </div>
          </section>
          <section className="insight-card">
            <span className="insight-icon"><Sparkles size={18} /></span>
            <div><p className="mono-label">AI INSIGHT</p><h3>{dashboard.insightTitle}</h3><p>{dashboard.insightBody}</p><button onClick={() => setNotice(dashboard.insightNotice)}>Review recommendation <ArrowUpRight size={14} /></button></div>
          </section>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setModalOpen(false)}>
          <form className="modal" onSubmit={createItem} onMouseDown={(event) => event.stopPropagation()}>
            <header><div><p className="mono-label">{dashboard.modalEyebrow}</p><h2>{dashboard.modalTitle}</h2></div><button type="button" onClick={() => setModalOpen(false)} aria-label="Close"><X size={18} /></button></header>
            {dashboard.formFields.map((field) => (
              <label key={field.name}>{field.label}<input name={field.name} required placeholder={field.placeholder} /></label>
            ))}
            <div className="route-preview"><ShieldCheck size={16} /><span><strong>Policy preview</strong>{dashboard.policyPreview}</span></div>
            <footer><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button className="primary-button" type="submit">{dashboard.submitLabel}</button></footer>
          </form>
        </div>
      )}
    </>
  );
}

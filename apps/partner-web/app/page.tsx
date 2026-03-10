"use client";

import { AnalyticsChart, KpiCard, PageShell, SectionHeader, SurfaceCard } from "@bigcup/ui";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1";

export default function PartnerDashboard() {
  const [shops, setShops] = useState<{ id: string; name: string; address: string }[]>([]);
  const [plans, setPlans] = useState<{ name: string; cupsPerMonth: number }[]>([]);
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/coffee-shops`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_BASE}/subscriptions/plans`).then((r) => (r.ok ? r.json() : []))
    ])
      .then(([s, p]) => {
        setShops(Array.isArray(s) ? s : []);
        setPlans(Array.isArray(p) ? p : []);
        setApiOk(true);
      })
      .catch(() => setApiOk(false));
  }, []);

  return (
    <PageShell>
      <SectionHeader title="Coffee Shop Operations" subtitle="Fast scanner-first controls with live queue and trading metrics." />
      {apiOk === false && (
        <p className="mb-4 rounded-lg bg-amber-100 p-3 text-sm text-amber-900" aria-live="polite">
          API not reachable at {API_BASE}. Start the API (and Docker for DB/Redis) to see live data.
        </p>
      )}
      {apiOk === true && (
        <p className="mb-4 rounded-lg bg-mint/20 p-3 text-sm text-espresso" aria-live="polite">
          Connected to API
        </p>
      )}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard title="Redeemed Today" subtitle="124" />
        <KpiCard title="Revenue Generated" subtitle="GBP 1,840" />
        <KpiCard title="Subscription Tiers" subtitle={plans.length ? `${plans.length} plans` : "—"} />
        <KpiCard title="Approved Shops" subtitle={shops.length ? String(shops.length) : "—"} />
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SurfaceCard>
          <h3 className="text-lg font-semibold text-espresso">Scan Customer QR</h3>
          <p className="mt-1 text-sm text-slate">Open scanner to redeem a cup. Manual code fallback available.</p>
        </SurfaceCard>
        <AnalyticsChart title="Monthly Redemptions" />
      </section>
      {shops.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-lg font-medium">Nearby / approved cafés</h2>
          <ul className="space-y-1 text-sm text-slate">
            {shops.slice(0, 5).map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong> — {s.address}
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}

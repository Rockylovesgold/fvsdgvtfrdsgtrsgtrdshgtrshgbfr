"use client";

import { AnalyticsChart, DataTable, KpiCard, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1";

export default function AdminDashboard() {
  const [plans, setPlans] = useState<{ name: string; cupsPerMonth: number }[]>([]);
  const [shops, setShops] = useState<{ id: string; name: string }[]>([]);
  const [analytics, setAnalytics] = useState<{ users?: number; activeSubscriptions?: number; redemptions?: number } | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/subscriptions/plans`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_BASE}/coffee-shops`).then((r) => (r.ok ? r.json() : [])),
      fetch(`${API_BASE}/analytics/platform`, { credentials: "include" }).then((r) => (r.ok ? r.json() : null))
    ])
      .then(([p, s, a]) => {
        setPlans(Array.isArray(p) ? p : []);
        setShops(Array.isArray(s) ? s : []);
        setAnalytics(a);
        setApiOk(true);
      })
      .catch(() => setApiOk(false));
  }, []);

  const totalPlans = plans.length;
  const totalShops = shops.length;

  return (
    <PageShell>
      <SectionHeader
        title="Operations Command Center"
        subtitle="Live visibility across growth, partner performance, and risk signals."
      />
      {apiOk === false && (
        <p className="mb-4 rounded-lg bg-amber-100 p-3 text-sm text-amber-900" aria-live="polite">
          API not reachable at {API_BASE}. Start the API and (optionally) Docker for Postgres/Redis, then run db:migrate and db:seed.
        </p>
      )}
      {apiOk === true && (
        <p className="mb-4 rounded-lg bg-mint/20 p-3 text-sm text-espresso" aria-live="polite">
          Connected to API
        </p>
      )}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard
          title="Total Users"
          subtitle={analytics?.users != null ? String(analytics.users) : "—"}
        />
        <KpiCard
          title="Active Subscriptions"
          subtitle={analytics?.activeSubscriptions != null ? String(analytics.activeSubscriptions) : "—"}
        />
        <KpiCard
          title="Subscription Plans"
          subtitle={totalPlans ? `${totalPlans} plans` : "—"}
        />
        <KpiCard title="Partner Cafes" subtitle={totalShops ? String(totalShops) : "—"} />
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnalyticsChart
          title="Cups Redeemed"
          subtitle={analytics?.redemptions != null ? `Total: ${analytics.redemptions}` : undefined}
        />
        <AnalyticsChart title="Top Cafes" subtitle={totalShops ? `${totalShops} approved shops` : undefined} />
      </section>
      <section className="mt-6">
        <DataTable
          title="Coffee Shops"
          subtitle={shops.length ? `${shops.length} shops` : "Queue for approval"}
        >
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist/60">
              {(shops.length ? shops.slice(0, 8) : [{ id: "empty", name: "No shops synced yet" }]).map((shop) => (
                <tr key={shop.id}>
                  <td className="py-3">{shop.name}</td>
                  <td className="py-3">
                    <StatusChip tone={shop.id === "empty" ? "warning" : "success"}>
                      {shop.id === "empty" ? "Needs sync" : "Approved"}
                    </StatusChip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </section>
    </PageShell>
  );
}

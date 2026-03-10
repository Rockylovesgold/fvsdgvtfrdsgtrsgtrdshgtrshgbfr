import { KpiCard, PageShell, SectionHeader, SurfaceCard } from "@bigcup/ui";

export default function Page() {
  return (
    <PageShell>
      <SectionHeader title="Financial Operations" subtitle="Revenue, payouts, commissions, and liabilities." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard title="MRR" subtitle="GBP 146,200" />
        <KpiCard title="Payouts Due" subtitle="GBP 23,940" />
        <KpiCard title="Refund Exposure" subtitle="GBP 1,120" />
        <KpiCard title="Net Margin" subtitle="68.4%" />
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SurfaceCard>
          <h3 className="text-base font-semibold text-espresso">Upcoming Payout Batch</h3>
          <p className="mt-1 text-sm text-slate">17 cafes pending payout settlement on Friday 09:00 UTC.</p>
        </SurfaceCard>
        <SurfaceCard>
          <h3 className="text-base font-semibold text-espresso">Finance Alerts</h3>
          <p className="mt-1 text-sm text-slate">2 reconciliation mismatches and 1 disputed transaction require review.</p>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}

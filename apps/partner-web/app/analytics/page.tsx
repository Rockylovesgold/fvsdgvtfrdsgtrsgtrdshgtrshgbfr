import { AnalyticsChart, KpiCard, PageShell, SectionHeader } from "@bigcup/ui";

export default function PartnerAnalyticsPage() {
  return (
    <PageShell>
      <SectionHeader title="Partner Analytics" subtitle="Cups redeemed, top periods, and payout performance." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard title="Cups This Week" subtitle="742" />
        <KpiCard title="Repeat Members" subtitle="64%" />
        <KpiCard title="Avg Redemption Time" subtitle="6.2 sec" />
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AnalyticsChart title="Hourly Footfall" subtitle="Peak 08:30-10:00 and 13:00-14:00" />
        <AnalyticsChart title="Payout Trend" subtitle="4-week payout consistency and variance" />
      </section>
    </PageShell>
  );
}

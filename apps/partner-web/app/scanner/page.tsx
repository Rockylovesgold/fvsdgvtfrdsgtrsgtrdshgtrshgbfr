import { Button, KpiCard, PageShell, SectionHeader, SurfaceCard } from "@bigcup/ui";

export default function ScannerPage() {
  return (
    <PageShell>
      <SectionHeader title="Scanner Terminal" subtitle="Fast redemption flow designed for busy counter operations." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard title="Queue" subtitle="6 waiting" />
        <KpiCard title="Success Rate" subtitle="98.9%" />
        <KpiCard title="Fallback Entries" subtitle="3 today" />
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
        <SurfaceCard>
          <h3 className="text-lg font-semibold text-espresso">Live Camera Scanner</h3>
          <p className="mt-1 text-sm text-slate">Ready to scan customer membership QR.</p>
          <div className="mt-4 h-64 rounded-2xl border border-dashed border-mist bg-oat/40" />
          <div className="mt-4 flex gap-2">
            <Button>Start scan</Button>
            <Button intent="secondary">Pause</Button>
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h3 className="text-base font-semibold text-espresso">Manual fallback</h3>
          <p className="mt-1 text-sm text-slate">Enter one-time token when camera scan fails.</p>
          <input
            className="mt-3 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm"
            placeholder="Paste token"
          />
          <Button className="mt-3 w-full">Validate token</Button>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}

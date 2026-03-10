import { DataTable, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";

const campaigns = [
  { id: "c1", name: "Spring Flat White Week", audience: "Gold + Platinum", status: "active" },
  { id: "c2", name: "Morning Rush Reactivation", audience: "Dormant users", status: "scheduled" },
  { id: "c3", name: "Referral Boost", audience: "All members", status: "draft" }
];

export default function MarketingPage() {
  return (
    <PageShell>
      <SectionHeader title="Marketing Campaigns" subtitle="Plan audience targeting, publish campaigns, and track readiness." />
      <DataTable title="Campaign Pipeline" subtitle={`${campaigns.length} active records`}>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="pb-2">Campaign</th>
              <th className="pb-2">Audience</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist/60">
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="py-3">{campaign.name}</td>
                <td className="py-3">{campaign.audience}</td>
                <td className="py-3">
                  <StatusChip tone={campaign.status === "active" ? "success" : campaign.status === "scheduled" ? "info" : "neutral"}>
                    {campaign.status}
                  </StatusChip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </PageShell>
  );
}

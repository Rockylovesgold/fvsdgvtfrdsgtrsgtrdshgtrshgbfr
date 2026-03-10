import { DataTable, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";

const shops = [
  { id: "s1", name: "Roast + Ritual", city: "London", status: "approved" },
  { id: "s2", name: "Northline Coffee", city: "Manchester", status: "pending" },
  { id: "s3", name: "Velvet Cup", city: "Bristol", status: "suspended" }
];

export default function Page() {
  return (
    <PageShell>
      <SectionHeader title="Coffee Shop Management" subtitle="Approve partners, monitor compliance, and action escalations." />
      <DataTable title="Partner Queue" subtitle="Review status and assign follow-up actions">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="pb-2">Shop</th>
              <th className="pb-2">City</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist/60">
            {shops.map((shop) => (
              <tr key={shop.id}>
                <td className="py-3">{shop.name}</td>
                <td className="py-3">{shop.city}</td>
                <td className="py-3">
                  <StatusChip tone={shop.status === "approved" ? "success" : shop.status === "pending" ? "warning" : "danger"}>
                    {shop.status}
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

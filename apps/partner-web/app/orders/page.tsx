import { DataTable, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";

const orders = [
  { id: "o1", customer: "Amelia Price", item: "Flat white", status: "NEW" },
  { id: "o2", customer: "Theo Hayes", item: "Cappuccino", status: "IN_PROGRESS" },
  { id: "o3", customer: "Noah Reed", item: "Latte", status: "COMPLETED" },
  { id: "o4", customer: "Mia Stone", item: "Mocha", status: "ARCHIVED" }
];

export default function OrdersPage() {
  return (
    <PageShell>
      <SectionHeader title="Order Queue" subtitle="Track in-store order flow and update statuses quickly." />
      <DataTable title="Orders" subtitle={`${orders.length} entries`}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Item</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist/60">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-3">{order.customer}</td>
                <td className="py-3">{order.item}</td>
                <td className="py-3">
                  <StatusChip tone={order.status === "NEW" ? "warning" : order.status === "IN_PROGRESS" ? "info" : "success"}>
                    {order.status}
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

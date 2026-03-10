import { DataTable, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";

const tickets = [
  { id: "t1", subject: "Double redemption charge", priority: "high", status: "open" },
  { id: "t2", subject: "Cafe location mismatch", priority: "normal", status: "triage" },
  { id: "t3", subject: "Unable to reset password", priority: "urgent", status: "open" }
];

export default function SupportPage() {
  return (
    <PageShell>
      <SectionHeader title="Support Queue" subtitle="Ticket triage, escalations, and operator ownership." />
      <DataTable title="Open Tickets" subtitle={`${tickets.length} tickets requiring action`}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="pb-2">Subject</th>
              <th className="pb-2">Priority</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist/60">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="py-3">{ticket.subject}</td>
                <td className="py-3">
                  <StatusChip tone={ticket.priority === "urgent" || ticket.priority === "high" ? "danger" : "neutral"}>
                    {ticket.priority}
                  </StatusChip>
                </td>
                <td className="py-3">
                  <StatusChip tone={ticket.status === "open" ? "warning" : "info"}>
                    {ticket.status}
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

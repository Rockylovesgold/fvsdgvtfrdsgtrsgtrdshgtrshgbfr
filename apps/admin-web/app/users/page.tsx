"use client";

import { DataTable, PageShell, SectionHeader, StatusChip } from "@bigcup/ui";
import { useMemo, useState } from "react";

const rows = [
  { id: "u1", name: "Amelia Price", plan: "Gold", status: "active", risk: "low" },
  { id: "u2", name: "Carter Miles", plan: "Bronze", status: "paused", risk: "medium" },
  { id: "u3", name: "Hannah Khan", plan: "Platinum", status: "active", risk: "low" },
  { id: "u4", name: "Theo Hayes", plan: "Gold", status: "flagged", risk: "high" }
];

export default function Page() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <PageShell>
      <SectionHeader title="User Management" subtitle="Review customer activity, subscriptions, and risk signals." />
      <div className="mb-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search users"
          className="w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm"
        />
      </div>
      <DataTable title="Customers" subtitle={`${filtered.length} matching users`}>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Plan</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist/60">
            {filtered.map((row) => (
              <tr key={row.id}>
                <td className="py-3">{row.name}</td>
                <td className="py-3">{row.plan}</td>
                <td className="py-3">
                  <StatusChip tone={row.status === "flagged" ? "danger" : row.status === "paused" ? "warning" : "success"}>
                    {row.status}
                  </StatusChip>
                </td>
                <td className="py-3">
                  <StatusChip tone={row.risk === "high" ? "danger" : row.risk === "medium" ? "warning" : "neutral"}>
                    {row.risk}
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

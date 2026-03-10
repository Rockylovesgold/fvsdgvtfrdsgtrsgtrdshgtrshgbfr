"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, BarChart3, Filter, ShieldAlert, Ticket, Users } from "lucide-react";
import { pageVariants, sectionVariants, staggerContainer } from "../lib/motion";
import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
  ViewState,
  ViewStateSwitch
} from "./ViewStateSwitch";

const userRows = [
  { name: "Sophia R.", plan: "Gold", status: "Active", risk: "Low" },
  { name: "Ethan K.", plan: "Bronze", status: "Paused", risk: "Medium" },
  { name: "Mia T.", plan: "Platinum", status: "Active", risk: "Low" }
];

export function AdminView() {
  const [state, setState] = useState<ViewState>("live");

  if (state === "loading") {
    return (
      <main className="space-y-4">
        <ViewStateSwitch state={state} onChange={setState} />
        <LoadingPanel />
        <LoadingPanel />
      </main>
    );
  }
  if (state === "empty") {
    return (
      <main className="space-y-4">
        <ViewStateSwitch state={state} onChange={setState} />
        <EmptyPanel title="No admin analytics available" subtitle="Once data pipelines sync, KPI panels will populate here." />
      </main>
    );
  }
  if (state === "error") {
    return (
      <main className="space-y-4">
        <ViewStateSwitch state={state} onChange={setState} />
        <ErrorPanel subtitle="Analytics provider failed. Please refresh the dashboard." />
      </main>
    );
  }

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 pb-8">
      <ViewStateSwitch state={state} onChange={setState} />
      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="premium-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate">Admin operations</p>
            <h1 className="mt-1 text-2xl font-semibold">Platform Control Center</h1>
          </div>
          <button className="focus-ring inline-flex items-center gap-2 rounded-xl border border-mist bg-flatwhite px-3 py-2 text-sm">
            <Filter className="h-4 w-4" /> Advanced filters
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi title="Total users" value="18,245" icon={Users} />
          <Kpi title="Active subscriptions" value="12,033" icon={BarChart3} />
          <Kpi title="Fraud flags" value="17" icon={ShieldAlert} />
          <Kpi title="Open support tickets" value="43" icon={Ticket} />
        </div>
      </motion.section>

      <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={sectionVariants} className="premium-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">User intelligence table</h2>
            <span className="rounded-full bg-espresso/10 px-3 py-1 text-xs text-slate">Live sync demo</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate">
                <tr>
                  <th className="pb-2">User</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {userRows.map((row) => (
                  <tr key={row.name} className="border-t border-mist/70">
                    <td className="py-3 font-medium">{row.name}</td>
                    <td className="py-3">{row.plan}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-mint/20 px-2 py-1 text-xs">{row.status}</span>
                    </td>
                    <td className="py-3">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="space-y-4">
          <Panel title="Finance snapshot" value="MRR GBP 241,900" />
          <Panel title="Top cafés by redemption" value="Big Cup Soho · Roast Lane · Flat White Club" />
          <div className="premium-card p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-caramel" />
              Risk monitor
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate">
              <li>Velocity alert spike in Zone 2</li>
              <li>2 duplicate scans auto-blocked</li>
              <li>1 payout hold pending review</li>
            </ul>
          </div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}

function Kpi({
  title,
  value,
  icon: Icon
}: {
  title: string;
  value: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-xl border border-mist bg-flatwhite p-3">
      <p className="text-xs text-slate">{title}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-semibold">{value}</p>
        <Icon className="h-4 w-4 text-caramel" />
      </div>
    </div>
  );
}

function Panel({ title, value }: { title: string; value: string }) {
  return (
    <div className="premium-card p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-sm text-slate">{value}</p>
    </div>
  );
}

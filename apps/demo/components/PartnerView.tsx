"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3, QrCode, TrendingUp, Users } from "lucide-react";
import { pageVariants, sectionVariants, staggerContainer } from "../lib/motion";
import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
  ViewState,
  ViewStateSwitch
} from "./ViewStateSwitch";

const queueItems = [
  { id: "q1", customer: "Liam M.", drink: "Flat White", status: "Awaiting scan", wait: "1m" },
  { id: "q2", customer: "Ava P.", drink: "Cappuccino", status: "In progress", wait: "3m" },
  { id: "q3", customer: "Noah R.", drink: "Americano", status: "Flagged", wait: "5m" }
];

export function PartnerView() {
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
        <EmptyPanel title="No active queue right now" subtitle="Customer redemptions will appear here automatically." />
      </main>
    );
  }
  if (state === "error") {
    return (
      <main className="space-y-4">
        <ViewStateSwitch state={state} onChange={setState} />
        <ErrorPanel subtitle="Scanner service is unavailable. Check connection and retry." />
      </main>
    );
  }

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 pb-8">
      <ViewStateSwitch state={state} onChange={setState} />
      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="premium-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate">Partner dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold">Big Cup Soho Operations</h1>
          </div>
          <span className="rounded-full bg-mint/20 px-3 py-1 text-xs text-espresso">Live</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi title="Redeemed today" value="219" icon={QrCode} />
          <Kpi title="Revenue impact" value="GBP 1,906" icon={TrendingUp} />
          <Kpi title="Active customers" value="87" icon={Users} />
          <Kpi title="Risk flags" value="2" icon={AlertTriangle} />
        </div>
      </motion.section>

      <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <motion.div variants={sectionVariants} className="premium-card p-5">
          <h2 className="text-lg font-semibold">Scanner terminal</h2>
          <div className="mt-4 rounded-2xl border border-dashed border-caramel/40 bg-flatwhite p-6 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-2xl border border-caramel/30 bg-oat"
            >
              <QrCode className="h-14 w-14 text-caramel" />
            </motion.div>
            <p className="font-medium">Ready to scan customer QR</p>
            <p className="mt-1 text-sm text-slate">Validation + redemption under 5 seconds</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <StatusChip icon={CheckCircle2} text="Last scan success" tone="success" />
            <StatusChip icon={AlertTriangle} text="1 duplicate prevented" tone="warn" />
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="premium-card p-5">
          <h2 className="text-lg font-semibold">Redemption queue</h2>
          <div className="mt-4 space-y-2">
            {queueItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-mist bg-flatwhite p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.customer}</p>
                  <span className="text-xs text-slate">{item.wait}</span>
                </div>
                <p className="mt-1 text-xs text-slate">{item.drink}</p>
                <p className="mt-2 inline-flex rounded-full bg-espresso/5 px-2 py-0.5 text-xs">{item.status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-3">
        <Panel title="Peak hours" subtitle="08:00 - 10:00 / 12:00 - 14:00" />
        <Panel title="Top customer repeat rate" subtitle="34% this week" />
        <Panel title="Payout projection" subtitle="GBP 4,280 (next cycle)" />
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
  icon: typeof QrCode;
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

function StatusChip({
  icon: Icon,
  text,
  tone
}: {
  icon: typeof CheckCircle2;
  text: string;
  tone: "success" | "warn";
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
        tone === "success" ? "bg-mint/20 text-espresso" : "bg-caramel/20 text-roast"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="text-xs">{text}</span>
    </div>
  );
}

function Panel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="premium-card p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 flex items-center gap-1 text-sm text-slate">
        <Clock3 className="h-3.5 w-3.5" /> {subtitle}
      </p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bell,
  Clock3,
  Compass,
  CupSoda,
  Gift,
  MapPin,
  QrCode,
  Sparkles,
  Star
} from "lucide-react";
import { pageVariants, sectionVariants, staggerContainer } from "../lib/motion";
import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
  ViewState,
  ViewStateSwitch
} from "./ViewStateSwitch";

const CAFE_DATA = [
  { id: "c1", name: "Big Cup Soho", address: "12 Soho Street", distance: "0.3 mi", rating: "4.8" },
  { id: "c2", name: "Roast Lane Shoreditch", address: "7 Curtain Road", distance: "0.8 mi", rating: "4.7" },
  { id: "c3", name: "Flat White Club", address: "22 Dean Street", distance: "1.1 mi", rating: "4.6" }
];

export function CustomerView() {
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
        <EmptyPanel title="No cafés discovered yet" subtitle="Try adjusting area filters or enabling location." />
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="space-y-4">
        <ViewStateSwitch state={state} onChange={setState} />
        <ErrorPanel subtitle="Wallet service timed out. Please retry in a few seconds." />
      </main>
    );
  }

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 pb-8"
    >
      <ViewStateSwitch state={state} onChange={setState} />
      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="premium-hero overflow-hidden rounded-[24px] bg-gradient-to-br from-roast via-espresso to-[#120d0b] p-6 text-oat">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-oat/75">Good morning, Rocky</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">Gold Membership</h1>
          </div>
          <button className="focus-ring rounded-xl border border-oat/20 bg-oat/10 p-2 hover:bg-oat/15">
            <Bell className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatChip label="Cups left" value="14" />
          <StatChip label="Used this month" value="6" />
          <StatChip label="Next billing" value="01 Apr" />
          <StatChip label="Streak" value="5 days" />
        </div>
      </motion.section>

      <motion.section variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <motion.div variants={sectionVariants} className="premium-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Wallet QR</h2>
            <span className="rounded-full bg-mint/20 px-3 py-1 text-xs text-espresso">Refresh 00:37</span>
          </div>
          <div className="relative mx-auto flex aspect-square max-w-[220px] items-center justify-center rounded-2xl bg-flatwhite p-6">
            <motion.div
              className="absolute inset-0 rounded-2xl border border-caramel/30"
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.02, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <QrCode className="h-24 w-24 text-espresso" />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate">One-time dynamic token</span>
            <button className="focus-ring rounded-lg bg-caramel px-3 py-1.5 text-flatwhite hover:opacity-90">Regenerate</button>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="premium-card p-5">
          <h2 className="text-lg font-semibold">Rewards</h2>
          <div className="mt-4 space-y-3">
            <RewardRow icon={Gift} title="Refer one friend" subtitle="Earn 3 bonus cups" />
            <RewardRow icon={Sparkles} title="Weekday streak" subtitle="5/5 complete" />
            <RewardRow icon={Star} title="Explore challenge" subtitle="Visit 3 new cafés" />
          </div>
        </motion.div>
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured cafés</h2>
          <button className="focus-ring rounded-lg px-2 py-1 text-sm text-slate hover:bg-espresso/5">View all</button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {CAFE_DATA.map((cafe) => (
            <motion.article
              key={cafe.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="premium-card p-4"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{cafe.name}</h3>
                <span className="rounded-full bg-caramel/15 px-2 py-0.5 text-xs text-caramel">{cafe.rating}</span>
              </div>
              <p className="mt-2 flex items-center gap-1 text-sm text-slate">
                <MapPin className="h-3.5 w-3.5" /> {cafe.address}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate">
                <Compass className="h-3.5 w-3.5" /> {cafe.distance}
              </p>
              <button className="focus-ring mt-4 w-full rounded-xl bg-espresso px-3 py-2 text-sm text-oat hover:bg-roast">
                Redeem here
              </button>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" animate="show" className="premium-card p-5">
        <h2 className="text-lg font-semibold">Recent orders</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <OrderItem cafe="Big Cup Soho" time="08:43 AM" status="Redeemed" />
          <OrderItem cafe="Roast Lane Shoreditch" time="Yesterday" status="Completed" />
        </div>
      </motion.section>
    </motion.main>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-oat/20 bg-oat/10 p-3">
      <p className="text-xs text-oat/70">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function RewardRow({
  icon: Icon,
  title,
  subtitle
}: {
  icon: typeof Gift;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-oat/60 p-3">
      <div className="rounded-lg bg-caramel/15 p-2 text-caramel">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-slate">{subtitle}</p>
      </div>
    </div>
  );
}

function OrderItem({ cafe, time, status }: { cafe: string; time: string; status: string }) {
  return (
    <div className="rounded-xl border border-mist bg-flatwhite p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{cafe}</p>
        <span className="rounded-full bg-mint/20 px-2 py-0.5 text-xs text-espresso">{status}</span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate">
        <Clock3 className="h-3.5 w-3.5" /> {time}
      </p>
      <p className="mt-2 flex items-center gap-1 text-xs text-slate">
        <CupSoda className="h-3.5 w-3.5" /> Flat White redeemed
      </p>
    </div>
  );
}

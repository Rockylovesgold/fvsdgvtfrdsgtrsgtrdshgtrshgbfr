"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CustomerView } from "../components/CustomerView";
import { PartnerView } from "../components/PartnerView";
import { AdminView } from "../components/AdminView";
import type { DemoMode } from "../components/ModeSwitcher";
import { pageVariants } from "../lib/motion";

export default function DemoPage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as DemoMode) || "customer";

  return (
    <AnimatePresence mode="wait">
      <motion.div key={mode} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        {mode === "partner" ? <PartnerView /> : mode === "admin" ? <AdminView /> : <CustomerView />}
      </motion.div>
    </AnimatePresence>
  );
}

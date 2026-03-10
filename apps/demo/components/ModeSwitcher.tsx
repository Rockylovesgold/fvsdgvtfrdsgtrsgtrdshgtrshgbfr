"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, Coffee, Store } from "lucide-react";
import { springTransition } from "../lib/motion";

export type DemoMode = "customer" | "partner" | "admin";

const MODES: { value: DemoMode; label: string; Icon: typeof Coffee }[] = [
  { value: "customer", label: "Customer", Icon: Coffee },
  { value: "partner", label: "Coffee Shop", Icon: Store },
  { value: "admin", label: "Admin", Icon: Crown }
];

export function ModeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("mode") as DemoMode) || "customer";

  function setMode(mode: DemoMode) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("mode", mode);
    router.push(`/?${next.toString()}`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-espresso/10 bg-oat/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="premium-card flex h-10 w-10 items-center justify-center rounded-xl bg-roast text-oat">
            <Coffee className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-tight text-espresso">Big Cup Club</p>
            <p className="text-xs text-slate">Premium coffee membership demo</p>
          </div>
        </div>
        <nav
          aria-label="Mode switcher"
          className="premium-card relative grid grid-cols-3 gap-1 rounded-2xl bg-flatwhite/80 p-1.5"
        >
          {MODES.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className="focus-ring relative z-10 flex min-w-[118px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              aria-pressed={current === value}
            >
              {current === value ? (
                <motion.span
                  layoutId="activeModePill"
                  transition={springTransition}
                  className="absolute inset-0 rounded-xl bg-caramel shadow-lg"
                />
              ) : null}
              <span className={`relative flex items-center gap-2 ${current === value ? "text-flatwhite" : "text-espresso/75"}`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${value}-${current === value ? "on" : "off"}`}
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.span>
                </AnimatePresence>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

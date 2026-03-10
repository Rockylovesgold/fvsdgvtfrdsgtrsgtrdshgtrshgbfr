"use client";

import { AlertCircle, LoaderCircle, Sparkles } from "lucide-react";

export type ViewState = "live" | "loading" | "empty" | "error";

export function ViewStateSwitch({
  state,
  onChange
}: {
  state: ViewState;
  onChange: (next: ViewState) => void;
}) {
  const options: { id: ViewState; label: string; icon: typeof Sparkles }[] = [
    { id: "live", label: "Live", icon: Sparkles },
    { id: "loading", label: "Loading", icon: LoaderCircle },
    { id: "empty", label: "Empty", icon: Sparkles },
    { id: "error", label: "Error", icon: AlertCircle }
  ];

  return (
    <div className="premium-card inline-flex items-center gap-1 rounded-xl p-1">
      {options.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`focus-ring inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs ${
            state === id ? "bg-espresso text-oat" : "text-slate hover:bg-espresso/5"
          }`}
        >
          <Icon className={`h-3.5 w-3.5 ${id === "loading" && state === id ? "animate-spin" : ""}`} />
          {label}
        </button>
      ))}
    </div>
  );
}

export function LoadingPanel() {
  return (
    <div className="premium-card p-5">
      <div className="h-5 w-44 animate-pulse rounded bg-espresso/10" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-espresso/10" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-espresso/10" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-espresso/10" />
      </div>
    </div>
  );
}

export function EmptyPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="premium-card p-8 text-center">
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-2 text-sm text-slate">{subtitle}</p>
      <button className="focus-ring mt-4 rounded-lg bg-caramel px-4 py-2 text-sm text-flatwhite">Add demo data</button>
    </div>
  );
}

export function ErrorPanel({ subtitle }: { subtitle: string }) {
  return (
    <div className="premium-card border-caramel/30 p-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-roast">
        <AlertCircle className="h-4 w-4" />
        Something went wrong
      </p>
      <p className="mt-2 text-sm text-slate">{subtitle}</p>
      <button className="focus-ring mt-3 rounded-lg bg-espresso px-3 py-1.5 text-xs text-oat">Retry</button>
    </div>
  );
}

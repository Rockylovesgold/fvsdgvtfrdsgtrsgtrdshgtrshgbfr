import React from "react";

type CardProps = { title: string; subtitle?: string; children?: React.ReactNode; className?: string };
type ClassNameProps = { className?: string; children?: React.ReactNode };
type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const cx = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(" ");

export const PageShell = ({ className, children }: ClassNameProps) => (
  <main className={cx("mx-auto min-h-screen w-full max-w-7xl px-4 py-6 md:px-8 md:py-8", className)}>
    {children}
  </main>
);

export const SectionHeader = ({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => (
  <header className={cx("mb-4 flex items-start justify-between gap-3", className)}>
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate">{subtitle}</p> : null}
    </div>
  </header>
);

export const SurfaceCard = ({ children, className }: ClassNameProps) => (
  <section className={cx("rounded-2xl border border-mist/70 bg-white p-5 shadow-soft", className)}>
    {children}
  </section>
);

export const Button = ({
  children,
  className,
  intent = "primary",
  type = "button"
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  intent?: "primary" | "secondary" | "ghost" | "danger";
  type?: "button" | "submit" | "reset";
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel/60";
  const variants = {
    primary: "bg-espresso text-oat hover:bg-roast",
    secondary: "bg-oat text-espresso hover:bg-mist",
    ghost: "bg-transparent text-espresso hover:bg-oat",
    danger: "bg-red-700 text-white hover:bg-red-800"
  };
  return (
    <button type={type} className={cx(base, variants[intent], className)}>
      {children}
    </button>
  );
};

export const StatusChip = ({
  tone = "neutral",
  children
}: {
  tone?: StatusTone;
  children: React.ReactNode;
}) => {
  const toneClasses: Record<StatusTone, string> = {
    neutral: "bg-mist text-slate",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    info: "bg-blue-100 text-blue-800"
  };
  return <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", toneClasses[tone])}>{children}</span>;
};

export const EmptyState = ({ title, subtitle }: CardProps) => (
  <SurfaceCard className="border-dashed text-center">
    <p className="text-sm font-medium text-espresso">{title}</p>
    {subtitle ? <p className="mt-1 text-sm text-slate">{subtitle}</p> : null}
  </SurfaceCard>
);

export const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cx("animate-pulse rounded-xl bg-mist/70", className)} />
);

export const FilterBar = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cx("flex flex-wrap items-center gap-2 rounded-xl border border-mist/60 bg-oat/50 p-3", className)}>
    {children}
  </div>
);

export const Toast = ({
  message,
  tone = "neutral",
  className
}: {
  message: string;
  tone?: StatusTone;
  className?: string;
}) => {
  const toneClasses: Record<StatusTone, string> = {
    neutral: "bg-espresso/95 text-oat",
    success: "bg-emerald-700 text-white",
    warning: "bg-amber-600 text-white",
    danger: "bg-rose-700 text-white",
    info: "bg-blue-700 text-white"
  };
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx("rounded-xl px-4 py-2.5 text-sm font-medium shadow-lift", toneClasses[tone], className)}
    >
      {message}
    </div>
  );
};

export const Modal = ({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-mist/70 bg-white p-5 shadow-lift">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-espresso">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-slate hover:bg-mist" aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const Drawer = ({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-espresso/30" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="w-full max-w-md rounded-l-2xl border-l border-t border-b border-mist/70 bg-white p-5 shadow-lift">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="drawer-title" className="text-lg font-semibold text-espresso">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-slate hover:bg-mist" aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const KpiCard = ({ title, subtitle, className }: CardProps) => (
  <SurfaceCard className={className}>
    <p className="text-xs uppercase tracking-wide text-slate">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-espresso">{subtitle ?? "—"}</p>
  </SurfaceCard>
);

export const DataTable = ({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => (
  <SurfaceCard>
    <div className="mb-3">
      <h3 className="text-base font-semibold text-espresso">{title}</h3>
      {subtitle ? <p className="text-sm text-slate">{subtitle}</p> : null}
    </div>
    <div className="overflow-x-auto">{children}</div>
  </SurfaceCard>
);

export const CoffeeCard = ({ title, subtitle }: CardProps) => (
  <SurfaceCard>
    <h3 className="font-display text-lg text-espresso">{title}</h3>
    {subtitle ? <p className="text-sm text-slate">{subtitle}</p> : null}
  </SurfaceCard>
);

export const CafeMapPin = ({ title }: CardProps) => (
  <div className="rounded-xl bg-caramel px-3 py-2 text-latte">{title}</div>
);

export const WalletCard = ({ title, subtitle }: CardProps) => (
  <CoffeeCard title={title} subtitle={subtitle} />
);

export const QRDisplay = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl border border-mint p-6 text-center">
    <h3>{title}</h3>
    <p>{subtitle ?? "Ready to scan"}</p>
  </div>
);

export const SubscriptionCard = ({ title, subtitle }: CardProps) => (
  <CoffeeCard title={title} subtitle={subtitle} />
);

export const AnalyticsChart = ({ title, subtitle }: CardProps) => (
  <SurfaceCard>
    <h3>{title}</h3>
    <p>{subtitle ?? "Chart ready"}</p>
  </SurfaceCard>
);

export const AdminTable = ({ title, subtitle }: CardProps) => (
  <SurfaceCard>
    <h3>{title}</h3>
    <p>{subtitle ?? "Table ready"}</p>
  </SurfaceCard>
);

export const MetricCard = ({ title, subtitle }: CardProps) => (
  <CoffeeCard title={title} subtitle={subtitle} />
);

export const AppHeader = ({ title, subtitle }: CardProps) => (
  <div className="mb-4 rounded-2xl border border-mist/60 bg-white p-4 shadow-soft">
    <h2 className="font-display text-2xl text-espresso">{title}</h2>
    {subtitle ? <p className="text-slate">{subtitle}</p> : null}
  </div>
);

export const MembershipCard = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl bg-espresso p-5 text-latte shadow-soft">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-latte/80">{subtitle}</p>
  </div>
);

export const CupBalanceDisplay = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl bg-caramel/10 p-4">
    <p className="text-xs uppercase tracking-wide text-slate">{title}</p>
    <p className="text-3xl font-semibold text-espresso">{subtitle ?? "0"}</p>
  </div>
);

export const QRPanel = ({ title, subtitle }: CardProps) => (
  <QRDisplay title={title} subtitle={subtitle} />
);

export const RewardBadge = ({ title, subtitle }: CardProps) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-mint/20 px-3 py-1 text-sm">
    <span>{title}</span>
    {subtitle ? <span className="text-slate">{subtitle}</span> : null}
  </div>
);

export const OfferBanner = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl bg-gradient-to-r from-caramel/20 to-mint/20 p-4">
    <h4 className="font-medium">{title}</h4>
    <p className="text-sm text-slate">{subtitle}</p>
  </div>
);

export const OrderHistoryCard = ({ title, subtitle }: CardProps) => (
  <CoffeeCard title={title} subtitle={subtitle} />
);

export const PlanSelector = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl border border-mist p-4">
    <h4>{title}</h4>
    <p className="text-sm text-slate">{subtitle}</p>
  </div>
);

export const LoyaltyProgressBar = ({ title, subtitle }: CardProps) => (
  <div className="rounded-2xl bg-white p-4 shadow-soft">
    <p className="text-sm font-medium">{title}</p>
    <div className="mt-2 h-2 rounded-full bg-mist">
      <div className="h-2 w-1/2 rounded-full bg-caramel" />
    </div>
    <p className="mt-2 text-xs text-slate">{subtitle}</p>
  </div>
);

export const NotificationCard = ({ title, subtitle }: CardProps) => (
  <CoffeeCard title={title} subtitle={subtitle} />
);

export const EmptyStateBlock = ({ title, subtitle }: CardProps) => (
  <EmptyState title={title} subtitle={subtitle} />
);

export const KPIStatCard = ({ title, subtitle }: CardProps) => <MetricCard title={title} subtitle={subtitle} />;
export const RedemptionScanner = ({ title, subtitle }: CardProps) => <QRDisplay title={title} subtitle={subtitle} />;
export const LiveFeedPanel = ({ title, subtitle }: CardProps) => <AnalyticsChart title={title} subtitle={subtitle} />;
export const OrderQueueCard = ({ title, subtitle }: CardProps) => <CoffeeCard title={title} subtitle={subtitle} />;
export const RevenueChart = ({ title, subtitle }: CardProps) => <AnalyticsChart title={title} subtitle={subtitle} />;
export const ShopProfileEditor = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const PayoutSummaryCard = ({ title, subtitle }: CardProps) => <MetricCard title={title} subtitle={subtitle} />;
export const PartnerSidebar = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const TransactionTable = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const StaffRoleBadge = ({ title, subtitle }: CardProps) => <RewardBadge title={title} subtitle={subtitle} />;

export const AdminSidebar = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const TopbarCommandSearch = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const KPIGrid = ({ title, subtitle }: CardProps) => <AnalyticsChart title={title} subtitle={subtitle} />;
export const AnalyticsPanel = ({ title, subtitle }: CardProps) => <AnalyticsChart title={title} subtitle={subtitle} />;
export const UserTable = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const ShopTable = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const FraudFlagCard = ({ title, subtitle }: CardProps) => <MetricCard title={title} subtitle={subtitle} />;
export const CampaignBuilder = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const SupportTicketPanel = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const FinanceSummaryCard = ({ title, subtitle }: CardProps) => <MetricCard title={title} subtitle={subtitle} />;
export const FilterToolbar = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const ExportMenu = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;
export const AuditLogTable = ({ title, subtitle }: CardProps) => <AdminTable title={title} subtitle={subtitle} />;

import { PageShell, SkeletonBlock } from "@bigcup/ui";

export default function Loading() {
  return (
    <PageShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SkeletonBlock className="h-24" />
        <SkeletonBlock className="h-24" />
        <SkeletonBlock className="h-24" />
      </div>
      <SkeletonBlock className="mt-6 h-80" />
    </PageShell>
  );
}

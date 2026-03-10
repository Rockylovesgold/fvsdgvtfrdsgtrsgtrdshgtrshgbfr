"use client";

import { Button, EmptyState, PageShell } from "@bigcup/ui";

export default function Error({
  reset
}: {
  reset: () => void;
}) {
  return (
    <PageShell>
      <EmptyState title="Unable to load admin view" subtitle="Try refreshing the page or reconnecting to the API." />
      <div className="mt-4">
        <Button onClick={() => reset()}>Retry</Button>
      </div>
    </PageShell>
  );
}

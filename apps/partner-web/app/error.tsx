"use client";

import { Button, EmptyState, PageShell } from "@bigcup/ui";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <PageShell>
      <EmptyState title="Partner view unavailable" subtitle="Please retry after checking API connectivity." />
      <div className="mt-4">
        <Button onClick={() => reset()}>Retry</Button>
      </div>
    </PageShell>
  );
}

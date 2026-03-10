import "./globals.css";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ModeSwitcher } from "../components/ModeSwitcher";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-oat text-espresso font-sans antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-20%] h-[32rem] w-[32rem] rounded-full bg-caramel/15 blur-[120px]" />
          <div className="absolute right-[-10%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-mint/20 blur-[140px]" />
          <div className="absolute bottom-[-25%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-clay/10 blur-[120px]" />
        </div>
        <Suspense fallback={<header className="h-16 border-b border-espresso/10 bg-oat/90 backdrop-blur-sm" />}>
          <ModeSwitcher />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8 min-h-[50vh]" />}>
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}

import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/coffee-shops", label: "Coffee Shops" },
  { href: "/finance", label: "Finance" },
  { href: "/marketing", label: "Marketing" },
  { href: "/support", label: "Support" }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff_0%,_#f6f1eb_60%)] text-espresso">
          <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-4 md:grid-cols-[220px_1fr] md:px-8">
            <aside className="rounded-2xl border border-mist/70 bg-white/80 p-4 shadow-soft backdrop-blur">
              <p className="mb-4 font-display text-lg font-semibold">Big Cup Club</p>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm text-slate transition hover:bg-oat hover:text-espresso"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

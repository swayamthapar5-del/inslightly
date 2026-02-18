import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Survey", href: "/survey" },
  { label: "Wallet", href: "/wallet" },
  { label: "Rewards", href: "/rewards" },
  { label: "Notifications", href: "/notifications" }
];

export function AppShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="min-h-screen bg-haze dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-4 shadow-soft dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">InsightExchange</p>
            <p className="text-lg font-semibold text-ink dark:text-white">User Console</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-ink dark:text-slate-300 dark:hover:bg-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="rounded-3xl bg-white p-4 shadow-soft dark:bg-slate-900">
            <p className="text-sm font-semibold text-ink dark:text-white">Theme</p>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <header className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dashboard</p>
              <h1 className="text-2xl font-semibold text-ink dark:text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500">Last sync 2m ago</div>
              <LogoutButton />
            </div>
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}

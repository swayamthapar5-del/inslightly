"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#eef2f6_55%,_#dde4ee_100%)] dark:bg-[radial-gradient(circle_at_top,_#0b1220,_#0f172a_55%,_#111827_100%)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-ocean"></div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">InsightExchange</p>
            <p className="text-lg font-semibold">Feedback that pays back</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white shadow-soft"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">New standard for research</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink dark:text-white md:text-5xl">
            Trade real feedback for rewards and help teams build what matters.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            InsightExchange connects people with high-quality feedback opportunities and helps companies buy
            anonymized insights at scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/welcome"
              className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-soft"
            >
              Get started
            </Link>
            <Link
              href="/company/campaigns"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink shadow-soft"
            >
              For companies
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Fast onboarding", "Guaranteed payouts", "Privacy-first"].map((item) => (
              <div key={item} className="glass rounded-2xl p-4 text-sm font-medium text-slate-600 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-[32px] p-6 shadow-glass"
        >
          <div className="grid gap-5">
            <div className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today</p>
              <h3 className="text-2xl font-semibold text-ink dark:text-white">$42.50 earned</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">3 new surveys available</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-semibold text-ink dark:text-white">Latest Insight</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Customers trust apps that surface a transparent security roadmap.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-mint to-white p-4 text-ink shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em]">Wallet</p>
              <p className="text-2xl font-semibold">$128.00</p>
              <p className="text-sm">Next payout in 2 days</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}


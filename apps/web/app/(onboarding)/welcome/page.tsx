import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6 rounded-[36px] bg-white p-10 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Onboarding 1/3</p>
          <h1 className="text-3xl font-semibold text-ink">Welcome to InsightExchange</h1>
          <p className="text-sm text-slate-500">
            We will personalize the best feedback opportunities and rewards for you.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-ink">What to expect</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Match with campaigns in under 60 seconds</li>
            <li>Answer short surveys with autosave</li>
            <li>Cash out rewards instantly</li>
          </ul>
        </div>
        <div className="flex justify-between">
          <Link href="/login" className="text-sm text-slate-500">Back</Link>
          <Link href="/profile">
            <Button>Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConsentPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6 rounded-[36px] bg-white p-10 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Onboarding 3/3</p>
          <h1 className="text-3xl font-semibold text-ink">Privacy & consent</h1>
          <p className="text-sm text-slate-500">We anonymize responses and never sell personal data.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6 text-sm text-slate-600">
          By continuing, you agree to share anonymized feedback, participate in verified campaigns, and receive
          rewards payouts. You can delete your account at any time in Privacy Settings.
        </div>
        <div className="flex items-center justify-between">
          <Link href="/profile" className="text-sm text-slate-500">Back</Link>
          <Link href="/dashboard">
            <Button>Finish & enter dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

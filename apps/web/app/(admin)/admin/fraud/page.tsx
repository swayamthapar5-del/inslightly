import { Card } from "@/components/ui/card";

export default function AdminFraudPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin</p>
          <h1 className="text-3xl font-semibold text-ink">Fraud detection</h1>
        </header>
        <Card>
          <p className="text-sm font-semibold text-ink">Risk signals</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Bot probability</p>
              <p className="text-2xl font-semibold text-ink">0.22</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Chargeback rate</p>
              <p className="text-2xl font-semibold text-ink">1.1%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

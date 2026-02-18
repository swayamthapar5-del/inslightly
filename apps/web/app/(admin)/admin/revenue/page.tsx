import { Card } from "@/components/ui/card";

export default function AdminRevenuePage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin</p>
          <h1 className="text-3xl font-semibold text-ink">Revenue reporting</h1>
        </header>
        <Card>
          <p className="text-sm font-semibold text-ink">Monthly platform revenue</p>
          <div className="mt-4 rounded-3xl bg-violet/10 p-6">
            <p className="text-3xl font-semibold text-ink">$84,200</p>
            <p className="text-sm text-slate-500">+12% MoM</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

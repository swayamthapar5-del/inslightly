import { Card } from "@/components/ui/card";

export default function AdminOverviewPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin</p>
          <h1 className="text-3xl font-semibold text-ink">Platform overview</h1>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {["Users", "Campaigns", "Responses"].map((label, idx) => (
            <Card key={label}>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
              <p className="text-3xl font-semibold text-ink">{idx === 0 ? "12.4k" : idx === 1 ? "890" : "38k"}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

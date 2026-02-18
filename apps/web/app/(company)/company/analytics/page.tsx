import { Card } from "@/components/ui/card";
import { EarningsChart } from "@/components/charts/earnings-chart";

export default function CompanyAnalyticsPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Company Analytics</p>
          <h1 className="text-3xl font-semibold text-ink">Response intelligence</h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Response volume</p>
            <EarningsChart />
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sentiment</p>
            <div className="mt-6 rounded-3xl bg-mint p-5 text-ink">
              <p className="text-2xl font-semibold">+0.62</p>
              <p className="text-sm">Positive skew across 312 responses</p>
            </div>
          </Card>
        </div>

        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Heatmap highlights</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-10 rounded-xl ${idx % 3 === 0 ? "bg-ocean/70" : idx % 3 === 1 ? "bg-ocean/40" : "bg-ocean/20"}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

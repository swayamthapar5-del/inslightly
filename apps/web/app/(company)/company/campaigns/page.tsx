import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CampaignBuilderPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Company Console</p>
          <h1 className="text-3xl font-semibold text-ink">Campaign builder</h1>
        </header>

        <Card>
          <p className="text-sm font-semibold text-ink">Step 1: Audience filters</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Region</p>
              <p className="text-sm text-ink">US, Canada</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Interests</p>
              <p className="text-sm text-ink">Fintech, Travel</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Age range</p>
              <p className="text-sm text-ink">25-40</p>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink">Step 2: Budget</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Total budget</p>
              <p className="text-lg font-semibold text-ink">$1,500</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase text-slate-400">Per response</p>
              <p className="text-lg font-semibold text-ink">$5</p>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink">Step 3: Questions</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-ink">MCQ: What convinced you to try our app?</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-ink">Rating: How much do you trust our security?</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-ink">Open text: What should we improve?</p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Save draft</Button>
          <Button>Launch campaign</Button>
        </div>
      </div>
    </div>
  );
}

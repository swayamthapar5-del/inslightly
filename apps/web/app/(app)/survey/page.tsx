import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SurveyPage() {
  return (
    <AppShell title="Active Survey">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Survey 2/5</p>
            <h2 className="text-2xl font-semibold text-ink">Mobile banking trust signals</h2>
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/5 bg-ocean"></div>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold text-ink">What convinced you to try a new banking app?</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {["Cashback", "Security", "Friend referral", "Design"].map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm hover:border-ocean"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <p className="text-sm font-semibold text-ink">Any onboarding friction we should know?</p>
            <textarea
              rows={4}
              placeholder="Your response is autosaved"
              className="mt-4 w-full rounded-2xl border border-slate-200 p-4 text-sm"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="ghost">Save for later</Button>
          <Button>Next question</Button>
        </div>
      </Card>
    </AppShell>
  );
}

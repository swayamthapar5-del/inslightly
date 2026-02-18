import { Card } from "@/components/ui/card";

export default function AdminModerationPage() {
  return (
    <div className="min-h-screen bg-haze px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin</p>
          <h1 className="text-3xl font-semibold text-ink">User moderation</h1>
        </header>
        <Card>
          <p className="text-sm font-semibold text-ink">Flags requiring review</p>
          <div className="mt-4 space-y-3">
            {["Duplicate submissions", "Suspicious VPN traffic", "Chargeback risk"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 p-4">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

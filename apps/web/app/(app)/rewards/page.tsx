import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rewards = [
  { id: "r1", title: "$10 Amazon gift card", points: "1000 pts" },
  { id: "r2", title: "$25 PayPal cashout", points: "2500 pts" },
  { id: "r3", title: "Premium partner coupon", points: "800 pts" }
];

export default function RewardsPage() {
  return (
    <AppShell title="Rewards">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rewards catalog</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {rewards.map((reward) => (
            <div key={reward.id} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-ink">{reward.title}</p>
              <p className="text-xs text-slate-500">{reward.points}</p>
              <Button className="mt-4 w-full" variant="outline">Redeem</Button>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

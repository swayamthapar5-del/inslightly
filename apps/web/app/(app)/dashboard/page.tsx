"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EarningsChart } from "@/components/charts/earnings-chart";
import { ActivityDonut } from "@/components/charts/activity-donut";
import { apiRequest } from "@/lib/api";
import { getAccessToken, clearTokens } from "@/lib/auth";

type Campaign = {
  id: string;
  title: string;
  budgetPerResponse: number;
  questions: Array<unknown>;
  status: string;
};

type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
};

type Wallet = {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    async function load() {
      const token = getAccessToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const [campaignData, walletData] = await Promise.all([
          apiRequest<Campaign[]>("/campaigns", { token }),
          apiRequest<Wallet>("/wallet", { token })
        ]);
        setCampaigns(campaignData);
        setWallet(walletData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load dashboard";
        setError(message);
        if (message.toLowerCase().includes("unauthorized")) {
          clearTokens();
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [router]);

  const newCount = useMemo(() => campaigns.filter((c) => c.status === "ACTIVE").length, [campaigns]);

  return (
    <AppShell title="Your Overview">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Earnings</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            {wallet ? `${formatMoney(wallet.balance, wallet.currency)} total balance` : "Loading balance..."}
          </h2>
          <EarningsChart />
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Activity</p>
          <ActivityDonut />
          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <p>{campaigns.length} campaigns available</p>
            <p>{wallet?.transactions?.length || 0} wallet transactions</p>
            <p>{newCount} active opportunities</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Opportunities</p>
            <h2 className="text-2xl font-semibold text-ink">Available feedback</h2>
          </div>
          <Badge>{newCount} active</Badge>
        </div>

        {isLoading ? <p className="mt-6 text-sm text-slate-500">Loading opportunities...</p> : null}
        {error ? <p className="mt-6 text-sm text-red-600">{error}</p> : null}

        {!isLoading && !error ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {campaigns.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {item.questions.length} questions · {formatMoney(item.budgetPerResponse, "USD")}
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {item.status}
                </span>
              </div>
            ))}
            {!campaigns.length ? <p className="text-sm text-slate-500">No campaigns available yet.</p> : null}
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}


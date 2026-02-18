"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import { getAccessToken, clearTokens } from "@/lib/auth";

type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
};

type Wallet = {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export default function WalletPage() {
  const router = useRouter();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWallet() {
      const token = getAccessToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const data = await apiRequest<Wallet>("/wallet", { token });
        setWallet(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load wallet";
        setError(message);
        if (message.toLowerCase().includes("unauthorized")) {
          clearTokens();
          router.replace("/login");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadWallet();
  }, [router]);

  return (
    <AppShell title="Wallet">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Balance</p>
          <h2 className="text-3xl font-semibold text-ink">
            {wallet ? formatMoney(wallet.balance, wallet.currency) : "Loading..."}
          </h2>
          <p className="text-sm text-slate-500">Current available wallet balance.</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Transactions</p>
          <h2 className="text-2xl font-semibold text-ink">{wallet?.transactions.length || 0}</h2>
          <p className="text-sm text-slate-500">Recent wallet activity entries.</p>
        </Card>
      </div>
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Transactions</p>
        {isLoading ? <p className="mt-4 text-sm text-slate-500">Loading transactions...</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {!isLoading && !error ? (
          <div className="mt-4 space-y-4">
            {wallet?.transactions.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{item.type}</p>
                  <p className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-sm font-semibold text-ink">
                  {formatMoney(item.amount, wallet.currency)} · {item.status}
                </p>
              </div>
            ))}
            {!wallet?.transactions.length ? <p className="text-sm text-slate-500">No transactions yet.</p> : null}
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}


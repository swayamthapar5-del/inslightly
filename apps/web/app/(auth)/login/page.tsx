"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { saveTokens } from "@/lib/auth";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: { email, password }
      });
      saveTokens(data.accessToken, data.refreshToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-haze px-6 py-16">
      <div className="mx-auto max-w-lg space-y-6 rounded-[32px] bg-white p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Welcome back</p>
          <h1 className="text-3xl font-semibold text-ink">Sign in to InsightExchange</h1>
          <p className="text-sm text-slate-500">Access your dashboard, rewards, and new campaigns.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Continue with Google
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
        <p className="text-sm text-slate-500">
          New here? <Link className="text-ocean" href="/welcome">Start onboarding</Link>
        </p>
      </div>
    </div>
  );
}


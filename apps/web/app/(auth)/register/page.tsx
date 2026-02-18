"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api";
import { saveTokens } from "@/lib/auth";

type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiRequest<RegisterResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password }
      });
      saveTokens(data.accessToken, data.refreshToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-haze px-6 py-16">
      <div className="mx-auto max-w-lg space-y-6 rounded-[32px] bg-white p-8 shadow-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Create account</p>
          <h1 className="text-3xl font-semibold text-ink">Join InsightExchange</h1>
          <p className="text-sm text-slate-500">Start earning rewards by sharing anonymous feedback.</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>

        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link className="text-ocean" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

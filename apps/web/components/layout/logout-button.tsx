"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { clearTokens, getRefreshToken } from "@/lib/auth";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: { refreshToken }
        });
      }
    } catch {
      // Tokens are cleared client-side even if backend logout fails.
    } finally {
      clearTokens();
      router.push("/login");
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isLoggingOut}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
    >
      {isLoggingOut ? "Signing out..." : "Sign out"}
    </button>
  );
}

import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ApiRequestOptions = {
  method?: string;
  token?: string | null;
  body?: unknown;
  skipAuthRetry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  })
    .then(async (res) => {
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.accessToken || !payload?.refreshToken) {
        clearTokens();
        return null;
      }

      saveTokens(payload.accessToken, payload.refreshToken);
      return payload.accessToken as string;
    })
    .catch(() => {
      clearTokens();
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const { method = "GET", token, body, skipAuthRetry = false } = options;
  const bearerToken = token ?? getAccessToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401 && !skipAuthRetry && !path.startsWith("/auth/")) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      return apiRequest<T>(path, { ...options, token: newAccessToken, skipAuthRetry: true });
    }
    throw new Error("Unauthorized");
  }

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    const message = payload?.message || `Request failed with status ${res.status}`;
    throw new Error(Array.isArray(message) ? message.join(", ") : String(message));
  }

  return payload as T;
}

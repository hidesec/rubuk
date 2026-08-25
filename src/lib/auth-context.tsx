"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  city: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  authHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => ({ ok: false }),
  logout: async () => {},
  authHeaders: () => ({}),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const storedToken = typeof window !== "undefined" ? localStorage.getItem("rubuk_token") : null;
      const headers: Record<string, string> = {};
      if (storedToken) headers["Authorization"] = `Bearer ${storedToken}`;
      const res = await fetch("/api/auth/me", { headers });
      const data = await res.json();
      if (data.ok && data.user) {
        setUser(data.user);
        if (storedToken) setToken(storedToken);
      } else {
        setUser(null);
        setToken(null);
        if (typeof window !== "undefined") localStorage.removeItem("rubuk_token");
      }
    } catch {
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
      setUser(data.user);
      if (data.token) {
        setToken(data.token);
        if (typeof window !== "undefined") localStorage.setItem("rubuk_token", data.token);
      }
      return { ok: true };
    }
    return { ok: false, error: data.error };
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") localStorage.removeItem("rubuk_token");
  };

  const authHeaders = (): Record<string, string> => {
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

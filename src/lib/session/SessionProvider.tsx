"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as store from "@/lib/data/demo";

interface SessionContextValue {
  user: store.SessionUser | null;
  loading: boolean;
  signOut: () => void;
  refresh: () => void;
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
  loading: true,
  signOut: () => {},
  refresh: () => {},
});

/**
 * Session provider. In demo mode the session lives in localStorage
 * (set via demo signIn()); when Supabase auth is wired, this provider
 * swaps to supabase.auth.getUser() — the consuming components don't change.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<store.SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => setUser(store.getSession());

  useEffect(() => {
    refresh();
    setLoading(false);
    const unsubscribe = store.subscribe(refresh);
    return unsubscribe;
  }, []);

  const signOut = () => {
    store.signOut();
  };

  return (
    <SessionContext.Provider value={{ user, loading, signOut, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

import { useCallback, useEffect, useState } from "react";
import { fetchBusinesses, type ApiBusiness } from "./api";

/**
 * Fetches the live business list (optionally filtered by a search query)
 * with loading/error state. The query is debounced so typing doesn't
 * hammer the API. Refreshable via pull-to-refresh.
 */
export function useBusinesses(q?: string) {
  const [debouncedQ, setDebouncedQ] = useState(q);
  const [businesses, setBusinesses] = useState<ApiBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchBusinesses(debouncedQ);
      setBusinesses(data.businesses);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [debouncedQ]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, [load]);

  return { businesses, loading, refreshing, error, refresh };
}

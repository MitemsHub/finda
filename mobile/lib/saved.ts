import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Saved businesses, persisted on-device. Keys are business slugs.
 * Swap for a Supabase table once accounts are live.
 */
const KEY = "finda_saved_v1";

let cache: string[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function persist(next: string[]) {
  cache = next;
  AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  listeners.forEach((l) => l());
}

/** Load persisted favorites once at app start (call from root layout). */
export function initSaved() {
  if (hydrated) return;
  hydrated = true;
  AsyncStorage.getItem(KEY)
    .then((raw) => {
      cache = raw ? (JSON.parse(raw) as string[]) : [];
      listeners.forEach((l) => l());
    })
    .catch(() => {});
}

export function isSaved(slug: string): boolean {
  return cache.includes(slug);
}

export function toggleSaved(slug: string) {
  persist(isSaved(slug) ? cache.filter((s) => s !== slug) : [...cache, slug]);
}

export function savedSlugs(): string[] {
  return cache;
}

/** Re-render hook for saved state. */
export function useSaved(): string[] {
  const [slugs, setSlugs] = useState<string[]>(cache);

  useEffect(() => {
    const update = () => setSlugs([...cache]);
    listeners.add(update);
    update();
    return () => {
      listeners.delete(update);
    };
  }, []);

  return slugs;
}

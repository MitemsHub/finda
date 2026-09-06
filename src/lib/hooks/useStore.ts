"use client";

import { useEffect, useState } from "react";
import * as store from "@/lib/data/demo";

/**
 * Subscribes to the demo store so components re-render when
 * bookings/favorites/notifications change. On the server it
 * returns the static seed; hydration swaps in persisted state.
 */
export function useStoreVersion() {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setVersion((v) => v + 1));
    return unsubscribe;
  }, []);

  return version;
}

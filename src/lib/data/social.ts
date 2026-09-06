// ─────────────────────────────────────────────────────────────
// finda social layer — follows, business updates, feed.
// Own storage key + pub/sub so it stays a small, focused module.
// Live mode: swaps to Supabase queries; the API surface is the contract.
// ─────────────────────────────────────────────────────────────

import {
  getApprovedBusinesses,
  getBusinessById,
  getSession,
  type Business,
  type BusinessUpdate,
  type Follow,
} from "./demo";

export type { BusinessUpdate, Follow };

const SOCIAL_KEY = "finda_social_v1";

interface SocialShape {
  updates: BusinessUpdate[];
  follows: Follow[];
}

const SEED_UPDATES: BusinessUpdate[] = [
  {
    id: "u_1",
    businessId: "b_1",
    type: "offer",
    text: "Weekend special: free small-chops with every party tray ordered before Saturday. WhatsApp us your order — 6 trays left.",
    createdAt: "2025-09-05T09:00:00.000Z",
    expiresAt: "2025-09-30T23:59:00.000Z",
    scope: "public",
  },
  {
    id: "u_2",
    businessId: "b_2",
    type: "event",
    text: "Cupping Saturday is back! This month we taste three origins from Taraba. ₦5,000, 10 AM — seats in our storefront.",
    createdAt: "2025-09-04T14:30:00.000Z",
    scope: "followers",
  },
  {
    id: "u_3",
    businessId: "b_8",
    type: "product",
    text: "Fresh stems just landed from the growers in Oyo. Same-day bouquets back on — order before 2 PM for evening delivery.",
    createdAt: "2025-09-05T11:15:00.000Z",
    scope: "public",
  },
  {
    id: "u_4",
    businessId: "b_6",
    type: "news",
    text: "Friday reading night returns: a new Nnedi novel + small-chops. Free entry, 6 PM. Seats go fast.",
    createdAt: "2025-09-03T17:00:00.000Z",
    scope: "followers",
  },
  {
    id: "u_5",
    businessId: "b_3",
    type: "offer",
    text: "Student promo: 20% off all cuts with a valid ID, weekdays before noon. Walk-ins welcome.",
    createdAt: "2025-09-01T08:00:00.000Z",
    expiresAt: "2025-09-30T23:59:00.000Z",
    scope: "public",
  },
  {
    id: "u_6",
    businessId: "b_10",
    type: "event",
    text: "New prenatal series starts next week — six Thursday mornings, trimester-safe. Two spots left.",
    createdAt: "2025-09-02T12:00:00.000Z",
    scope: "followers",
  },
];

const SEED_FOLLOWS: Follow[] = [
  { userId: "u_1", businessId: "b_2", followedAt: "2025-06-01T10:00:00.000Z" },
  { userId: "u_1", businessId: "b_6", followedAt: "2025-06-15T10:00:00.000Z" },
  { userId: "u_1", businessId: "b_10", followedAt: "2025-07-01T10:00:00.000Z" },
];

function load(): SocialShape {
  if (typeof window === "undefined") {
    return { updates: SEED_UPDATES, follows: SEED_FOLLOWS };
  }
  try {
    const raw = window.localStorage.getItem(SOCIAL_KEY);
    if (!raw) return { updates: SEED_UPDATES, follows: SEED_FOLLOWS };
    return {
      updates: SEED_UPDATES,
      follows: SEED_FOLLOWS,
      ...(JSON.parse(raw) as Partial<SocialShape>),
    };
  } catch {
    return { updates: SEED_UPDATES, follows: SEED_FOLLOWS };
  }
}

function save(social: SocialShape) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SOCIAL_KEY, JSON.stringify(social));
  } catch {
    // storage unavailable — session-only mode
  }
  emit();
}

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function currentUserId(): string {
  return getSession()?.id ?? "u_1";
}

// ── Follows ─────────────────────────────────────────────────

export function getFollowingIds(): string[] {
  const uid = currentUserId();
  return load()
    .follows.filter((f) => f.userId === uid)
    .map((f) => f.businessId);
}

export function isFollowing(businessId: string): boolean {
  return getFollowingIds().includes(businessId);
}

export function toggleFollow(businessId: string) {
  const social = load();
  const uid = currentUserId();
  const existing = social.follows.find(
    (f) => f.userId === uid && f.businessId === businessId
  );
  if (existing) {
    social.follows = social.follows.filter((f) => f !== existing);
  } else {
    social.follows.push({
      userId: uid,
      businessId,
      followedAt: new Date().toISOString(),
    });
  }
  save(social);
}

/** Demo follower counts so popular businesses aren't at zero. */
function seedFollowers(businessId: string): number {
  const base: Record<string, number> = {
    b_1: 842, b_2: 1105, b_3: 640, b_4: 530, b_5: 388, b_6: 720,
    b_7: 210, b_8: 460, b_9: 590, b_10: 340, b_11: 190, b_12: 175,
  };
  return base[businessId] ?? 40;
}

export function getFollowerCount(businessId: string): number {
  return (
    load().follows.filter((f) => f.businessId === businessId).length +
    seedFollowers(businessId)
  );
}

// ── Updates & feed ──────────────────────────────────────────

/** Public updates + follower-only updates from businesses you follow. */
export function getFeedUpdates(): (BusinessUpdate & { business: Business })[] {
  const following = new Set(getFollowingIds());
  const now = Date.now();
  return load()
    .updates.filter((u) => {
      if (u.expiresAt && new Date(u.expiresAt).getTime() < now) return false;
      return u.scope === "public" || following.has(u.businessId);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((u) => ({ ...u, business: getBusinessById(u.businessId) }))
    .filter((u): u is BusinessUpdate & { business: Business } =>
      Boolean(u.business)
    );
}

/** A business's own updates, newest first (owners see all). */
export function getUpdatesForBusiness(businessId: string): BusinessUpdate[] {
  return load()
    .updates.filter((u) => u.businessId === businessId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addUpdate(input: {
  businessId: string;
  type: BusinessUpdate["type"];
  text: string;
  scope: BusinessUpdate["scope"];
  expiresAt?: string;
}): BusinessUpdate {
  const social = load();
  const update: BusinessUpdate = {
    id: `u_${Date.now()}`,
    businessId: input.businessId,
    type: input.type,
    text: input.text.trim(),
    scope: input.scope,
    expiresAt: input.expiresAt || undefined,
    createdAt: new Date().toISOString(),
  };
  social.updates.unshift(update);
  save(social);
  return update;
}

export function deleteUpdate(id: string) {
  const social = load();
  social.updates = social.updates.filter((u) => u.id !== id);
  save(social);
}

/** Businesses you don't follow yet, ranked by rating — feed suggestions. */
export function getSuggestedBusinesses(limit = 3): Business[] {
  const following = new Set(getFollowingIds());
  return getApprovedBusinesses()
    .filter((b) => !following.has(b.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

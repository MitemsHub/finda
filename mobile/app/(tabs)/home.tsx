import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ArrowRight, Utensils, Dumbbell, Sparkles, Monitor, ShoppingBag, Stethoscope, Scissors, MoreHorizontal } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useBusinesses } from "../../lib/useBusinesses";
import { BusinessCard, SectionHeader, Loading, ErrorState } from "../../components/ui";
import type { ApiBusiness } from "../../lib/api";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";

const CATEGORIES = [
  { key: "food", label: "Food & Drink", icon: Utensils, bg: "#DCFCE7", fg: "#166534" },
  { key: "fitness", label: "Fitness", icon: Dumbbell, bg: "#DBEAFE", fg: "#1E40AF" },
  { key: "beauty", label: "Beauty & Spa", icon: Sparkles, bg: "#FAE8FF", fg: "#86198F" },
  { key: "tech", label: "Tech Repair", icon: Monitor, bg: "#FFEDD5", fg: "#9A3412" },
  { key: "shopping", label: "Shopping", icon: ShoppingBag, bg: "#FCE7F3", fg: "#9D174D" },
  { key: "health", label: "Healthcare", icon: Stethoscope, bg: "#E0E7FF", fg: "#3730A3" },
  { key: "grooming", label: "Grooming", icon: Scissors, bg: "#FEF3C7", fg: "#92400E" },
  { key: "more", label: "More", icon: MoreHorizontal, bg: "#F3F4F6", fg: "#4B5563" },
];

function matchCategory(b: ApiBusiness, key: string): boolean {
  const c = b.category.toLowerCase();
  switch (key) {
    case "food": return c.includes("restaurant") || c.includes("food") || c.includes("café") || c.includes("cafe") || c.includes("kitchen") || c.includes("bar");
    case "fitness": return c.includes("gym") || c.includes("fitness") || c.includes("yoga");
    case "beauty": return c.includes("spa") || c.includes("beauty") || c.includes("massage");
    case "tech": return c.includes("auto") || c.includes("repair") || c.includes("tech");
    case "shopping": return c.includes("book") || c.includes("store") || c.includes("shop") || c.includes("florist");
    case "health": return c.includes("dental") || c.includes("clinic") || c.includes("health");
    case "grooming": return c.includes("salon") || c.includes("barber") || c.includes("trim");
    default: return false;
  }
}

export default function Home() {
  const router = useRouter();
  const { businesses, loading, refreshing, error, refresh } = useBusinesses();

  const openNow = businesses.filter((b) => b.isOpen).slice(0, 6);
  const topRated = [...businesses].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const onCategory = (key: string) => {
    if (key === "more") {
      router.push("/(tabs)/explore");
      return;
    }
    router.push({ pathname: "/(tabs)/explore", params: { category: key } });
  };

  if (loading) return <Loading label="Finding Lagos businesses…" />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={undefined}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Kedu! 👋</Text>
            <Text style={styles.title}>What do you need today?</Text>
          </View>
          <View style={styles.cityBadge}>
            <Text style={styles.cityText}>📍 Lagos</Text>
          </View>
        </View>

        {/* Search entry */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Search size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search businesses, services…</Text>
        </TouchableOpacity>

        {/* Categories */}
        <SectionHeader title="Categories" action="See all" />
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.key} style={styles.categoryItem} onPress={() => onCategory(cat.key)}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.bg }]}>
                <cat.icon size={22} color={cat.fg} />
              </View>
              <Text style={styles.categoryName}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Open now */}
        <SectionHeader title="Open right now" action="Explore" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
        >
          {openNow.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              width={220}
              onPress={() => router.push({ pathname: "/business/[slug]", params: { slug: b.slug } })}
            />
          ))}
        </ScrollView>

        {/* Top rated */}
        <SectionHeader title="Top rated in Lagos" />
        <View style={styles.topList}>
          {topRated.map((b, i) => (
            <TouchableOpacity
              key={b.id}
              style={styles.topRow}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: "/business/[slug]", params: { slug: b.slug } })}
            >
              <Text style={styles.topRank}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <View style={styles.topTitleRow}>
                  <Text style={styles.topName} numberOfLines={1}>{b.name}</Text>
                  {b.verified ? <Text style={styles.topVerified}>✓</Text> : null}
                </View>
                <Text style={styles.topMeta}>{b.category} · {b.neighborhood}</Text>
              </View>
              <View style={styles.topRating}>
                <Text style={styles.topRatingText}>{b.rating.toFixed(1)}</Text>
              </View>
              <ArrowRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {error ? <ErrorState message={error} onRetry={refresh} /> : null}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContent: { paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  greeting: { fontSize: 14, color: "#6B7280", fontFamily: "Inter_500Medium" },
  title: { fontSize: 24, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL, marginTop: 2 },
  cityBadge: {
    backgroundColor: "#F0FDFA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCFBF1",
  },
  cityText: { fontSize: 12, color: TEAL, fontFamily: "Inter_700Bold" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
    marginBottom: 24,
  },
  searchPlaceholder: { fontSize: 14, color: "#9CA3AF", fontFamily: "Inter_500Medium", flex: 1 },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoryItem: { width: "23%", alignItems: "center", marginBottom: 16 },
  categoryIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: { fontSize: 10, color: CHARCOAL, textAlign: "center", fontFamily: "Inter_600SemiBold", lineHeight: 14 },
  hScroll: { paddingHorizontal: 20, gap: 14, paddingBottom: 8 },
  topList: { paddingHorizontal: 20, gap: 12 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  topRank: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: CHARCOAL,
    color: "white",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    overflow: "hidden",
  },
  topTitleRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  topName: { fontSize: 14, fontFamily: "Inter_700Bold", color: CHARCOAL, flexShrink: 1 },
  topVerified: { fontSize: 11, color: TEAL, fontFamily: "Inter_700Bold" },
  topMeta: { fontSize: 11, color: "#6B7280", marginTop: 2, fontFamily: "Inter_500Medium" },
  topRating: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topRatingText: { fontSize: 12, color: "#92400E", fontFamily: "Inter_700Bold" },
});

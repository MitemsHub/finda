import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, MapPin, Star, Phone } from "lucide-react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useBusinesses } from "../../lib/useBusinesses";
import { Loading, ErrorState, EmptyState, Stars, VerifiedBadge, priceLabel } from "../../components/ui";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";

const FILTERS = ["All", "Verified", "Open Now", "Top Rated"] as const;

export default function Explore() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const [query, setQuery] = useState(params.q ?? "");
  const [activeFilter, setActiveFilter] = useState<string>(
    params.category ? "Category" : "All"
  );

  const { businesses, loading, refreshing, error, refresh } = useBusinesses(
    params.category ? undefined : params.q || query || undefined
  );

  const filtered = useMemo(() => {
    let list = businesses;
    if (params.category) {
      // Simple category routing from the Home tab.
      const c = params.category;
      list = list.filter((b) => {
        const cat = b.category.toLowerCase();
        if (c === "food") return /restaurant|food|café|cafe|kitchen|bar/.test(cat);
        if (c === "fitness") return /gym|fitness|yoga/.test(cat);
        if (c === "beauty") return /spa|beauty|massage/.test(cat);
        if (c === "tech") return /auto|repair|tech/.test(cat);
        if (c === "shopping") return /book|store|shop|florist/.test(cat);
        if (c === "health") return /dental|clinic|health/.test(cat);
        if (c === "grooming") return /salon|barber|trim/.test(cat);
        return true;
      });
    }
    switch (activeFilter) {
      case "Verified":
        return list.filter((b) => b.verified);
      case "Open Now":
        return list.filter((b) => b.isOpen);
      case "Top Rated":
        return [...list].sort((a, b) => b.rating - a.rating).slice(0, 8);
      default:
        return list;
    }
  }, [businesses, activeFilter, params.category]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const openBusiness = (slug: string) =>
    router.push({ pathname: "/business/[slug]", params: { slug } });

  if (loading) return <Loading label="Loading businesses…" />;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover businesses near you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories, services..."
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => {
                setActiveFilter("All");
                refresh();
              }}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {error ? <ErrorState message={error} onRetry={refresh} /> : null}
        {!error && filtered.length === 0 ? (
          <EmptyState title="No matches" message="Try a different search or filter." />
        ) : null}

        {/* Featured Business */}
        {featured ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => openBusiness(featured.slug)}>
              <ImageBackground
                source={{ uri: featured.image }}
                style={styles.featuredCard}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.featuredOverlay}>
                  {featured.verified ? (
                    <View style={styles.featuredBadgeRow}>
                      <VerifiedBadge />
                    </View>
                  ) : null}
                  <Text style={styles.featuredTitle}>{featured.name}</Text>
                  <Text style={styles.featuredSubtitle} numberOfLines={2}>
                    {featured.description}
                  </Text>
                  <View style={styles.featuredMeta}>
                    <MapPin size={14} color="white" />
                    <Text style={styles.featuredMetaText}>
                      {featured.neighborhood} · {priceLabel(featured.priceLevel)}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.reserveButton} onPress={() => openBusiness(featured.slug)}>
                    <Text style={styles.reserveButtonText}>View Business</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </>
        ) : null}

        {/* All results list */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{activeFilter === "All" ? "All businesses" : activeFilter}</Text>
          <Text style={styles.seeAll}>{filtered.length} found</Text>
        </View>
        <View style={styles.listContainer}>
          {rest.map((b) => (
            <TouchableOpacity key={b.id} style={styles.popularItem} activeOpacity={0.85} onPress={() => openBusiness(b.slug)}>
              <Image source={{ uri: b.image }} style={styles.popularImage} />
              <View style={styles.popularContent}>
                <View style={styles.nameRow}>
                  <Text style={styles.popularName} numberOfLines={1}>{b.name}</Text>
                  {b.verified ? <VerifiedBadge /> : null}
                </View>
                <Text style={styles.popularCategory}>{b.category} · {priceLabel(b.priceLevel)}</Text>
                <View style={styles.popularMeta}>
                  <Stars rating={b.rating} size={10} />
                  <Text style={styles.popularDistance}> {b.rating.toFixed(1)} · {b.neighborhood}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(`tel:${b.phone.replace(/\D/g, "")}`)}
              >
                <Phone size={18} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContent: { paddingBottom: 20 },
  header: { paddingHorizontal: 20, marginTop: 10, marginBottom: 16 },
  title: { fontSize: 28, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4, fontFamily: "Inter_500Medium" },
  searchContainer: { flexDirection: "row", paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  searchInput: { flex: 1, height: "100%", fontFamily: "Inter_500Medium", fontSize: 14, color: CHARCOAL },
  filterButton: { width: 48, height: 48, backgroundColor: TEAL, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  filtersScroll: { marginBottom: 20 },
  filtersContent: { paddingHorizontal: 20, gap: 10 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "#F3F4F6" },
  filterChipActive: { backgroundColor: TEAL },
  filterText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "#6B7280" },
  filterTextActive: { color: "white" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL },
  seeAll: { fontSize: 13, color: TEAL, fontFamily: "Inter_600SemiBold" },
  featuredCard: { marginHorizontal: 20, height: 200, borderRadius: 20, overflow: "hidden", justifyContent: "flex-end", marginBottom: 24 },
  featuredOverlay: { padding: 16, backgroundColor: "rgba(0,0,0,0.45)", gap: 6 },
  featuredBadgeRow: { flexDirection: "row", marginBottom: 2 },
  featuredTitle: { color: "white", fontSize: 20, fontFamily: "PlayfairDisplay_700Bold" },
  featuredSubtitle: { color: "#E5E7EB", fontSize: 12, fontFamily: "Inter_400Regular" },
  featuredMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  featuredMetaText: { color: "#E5E7EB", fontSize: 12, fontFamily: "Inter_500Medium" },
  reserveButton: { backgroundColor: TEAL, paddingVertical: 10, borderRadius: 8, alignItems: "center", marginTop: 6 },
  reserveButtonText: { color: "white", fontSize: 13, fontFamily: "Inter_700Bold" },
  listContainer: { paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  popularItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  popularImage: { width: 60, height: 60, borderRadius: 12 },
  popularContent: { flex: 1, marginLeft: 12, gap: 4 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  popularName: { fontSize: 15, fontFamily: "Inter_700Bold", color: CHARCOAL, flexShrink: 1 },
  popularCategory: { fontSize: 11, color: "#6B7280", fontFamily: "Inter_500Medium" },
  popularMeta: { flexDirection: "row", alignItems: "center" },
  popularDistance: { fontSize: 11, color: "#9CA3AF", fontFamily: "Inter_500Medium" },
  callButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: TEAL, alignItems: "center", justifyContent: "center" },
});

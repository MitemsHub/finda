import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useBusinesses } from "../../lib/useBusinesses";
import { useSaved } from "../../lib/saved";
import { BusinessCard, SectionHeader, Loading, ErrorState, EmptyState } from "../../components/ui";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";

export default function Saved() {
  const router = useRouter();
  const { businesses, loading, error, refresh } = useBusinesses();
  const slugs = useSaved();

  const saved = useMemo(
    () => businesses.filter((b) => slugs.includes(b.slug)),
    [businesses, slugs]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved</Text>
          <Text style={styles.subtitle}>Businesses you're keeping close</Text>
        </View>

        {loading ? <Loading label="Loading your saved places…" /> : null}
        {error ? <ErrorState message={error} onRetry={refresh} /> : null}

        {!loading && !error ? (
          saved.length === 0 ? (
            <EmptyState
              title="Nothing saved yet"
              message="Tap the ♥ on any business and it will live here."
            />
          ) : (
            <View style={styles.grid}>
              {saved.map((b) => (
                <BusinessCard
                  key={b.id}
                  business={b}
                  onPress={() => router.push({ pathname: "/business/[slug]", params: { slug: b.slug } })}
                />
              ))}
            </View>
          )
        ) : null}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContent: { paddingBottom: 20 },
  header: { paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  title: { fontSize: 28, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4, fontFamily: "Inter_500Medium" },
  grid: { paddingHorizontal: 20, gap: 14 },
});

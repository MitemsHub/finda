import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Star, MapPin, BadgeCheck } from "lucide-react-native";
import { Image } from "expo-image";
import type { ApiBusiness } from "../lib/api";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";
const MUTED = "#6B7280";

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          color={i <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}
          fill={i <= Math.round(rating) ? "#F59E0B" : "transparent"}
        />
      ))}
    </View>
  );
}

export function VerifiedBadge() {
  return (
    <View style={styles.verifiedBadge}>
      <BadgeCheck size={11} color="white" />
      <Text style={styles.verifiedText}>Verified</Text>
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function priceLabel(level: 1 | 2 | 3): string {
  return "₦".repeat(level);
}

export function BusinessCard({
  business,
  onPress,
  width,
}: {
  business: ApiBusiness;
  onPress: () => void;
  width?: number;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, width ? { width } : null]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image source={{ uri: business.image }} style={styles.cardImage} contentFit="cover" />
      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardName} numberOfLines={1}>
            {business.name}
          </Text>
          {business.verified ? <VerifiedBadge /> : null}
        </View>
        <Text style={styles.cardCategory} numberOfLines={1}>
          {business.category} · {priceLabel(business.priceLevel)}
        </Text>
        <View style={styles.cardMetaRow}>
          <Stars rating={business.rating} />
          <Text style={styles.cardRating}>{business.rating.toFixed(1)}</Text>
          <Text style={styles.cardReviews}> ({business.reviewCount})</Text>
        </View>
        <View style={styles.cardLocationRow}>
          <MapPin size={11} color={MUTED} />
          <Text style={styles.cardLocation} numberOfLines={1}>
            {business.neighborhood}
          </Text>
          {!business.isOpen ? <Text style={styles.closed}>· Closed</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function Loading({ label = "Loading finda…" }: { label?: string }) {
  return (
    <View style={styles.stateContainer}>
      <ActivityIndicator color={TEAL} size="large" />
      <Text style={styles.stateText}>{label}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.stateContainer}>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.stateText}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.stateContainer}>
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.stateText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  starsRow: { flexDirection: "row", gap: 1 },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: TEAL,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedText: { color: "white", fontSize: 9, fontFamily: "Inter_700Bold" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL },
  sectionAction: { fontSize: 13, color: TEAL, fontFamily: "Inter_600SemiBold" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: { width: "100%", height: 110 },
  cardBody: { padding: 12, gap: 5 },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardName: { flex: 1, fontSize: 15, fontFamily: "Inter_700Bold", color: CHARCOAL },
  cardCategory: { fontSize: 12, color: MUTED, fontFamily: "Inter_500Medium" },
  cardMetaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardRating: { fontSize: 12, fontFamily: "Inter_700Bold", color: CHARCOAL },
  cardReviews: { fontSize: 11, color: MUTED },
  cardLocationRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  cardLocation: { fontSize: 11, color: MUTED, flexShrink: 1 },
  closed: { fontSize: 11, color: "#DC2626", fontFamily: "Inter_600SemiBold" },
  stateContainer: { alignItems: "center", justifyContent: "center", padding: 40, gap: 10 },
  stateText: { fontSize: 13, color: MUTED, textAlign: "center", fontFamily: "Inter_500Medium" },
  errorTitle: { fontSize: 16, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL },
  retryButton: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 4,
  },
  retryText: { color: "white", fontSize: 13, fontFamily: "Inter_700Bold" },
});

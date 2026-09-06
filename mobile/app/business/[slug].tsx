import React, { useCallback, useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform, ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft, MapPin, Phone, Globe, Clock, MessageCircle, BadgeCheck, Share2, ShoppingBag, Sparkles,
} from "lucide-react-native";
import { Image } from "expo-image";
import { fetchBusiness, whatsappUrl, type ApiBusinessDetail, type ApiProduct, type ApiReview } from "../../lib/api";
import { isSaved, toggleSaved, useSaved } from "../../lib/saved";
import { Stars, ErrorState, priceLabel } from "../../components/ui";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";
const MUTED = "#6B7280";

export default function BusinessDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const saved = useSaved();

  const [business, setBusiness] = useState<ApiBusinessDetail | null>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBusiness(slug);
      setBusiness(data.business);
      setProducts(data.products);
      setReviews(data.reviews);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load this business");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={TEAL} />
      </SafeAreaView>
    );
  }

  if (error || !business) {
    return (
      <SafeAreaView style={styles.center}>
        <ErrorState message={error ?? "Not found"} onRetry={load} />
      </SafeAreaView>
    );
  }

  const savedNow = saved.includes(business.slug);
  const whatsappMsg = `Hello ${business.name}, I found you on Finda and I'd like to make an enquiry.`;

  const share = async () => {
    const url = `https://finda.ng/business/${business.slug}`; // TODO: real domain from env
    const message = `${business.name} on Finda — ${business.category} in ${business.neighborhood}. Rated ${business.rating.toFixed(1)}⭐`;
    try {
      if (Platform.OS === "web") {
        await navigator.clipboard?.writeText(`${message}\n${url}`);
      } else {
        const Share = (await import("react-native")).Share;
        await Share.share({ message: `${message}\n${url}` });
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft size={22} color={CHARCOAL} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.backButton} onPress={share}>
                <Share2 size={18} color={CHARCOAL} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backButton, savedNow && styles.saveActive]}
                onPress={() => toggleSaved(business.slug)}
              >
                <Text style={{ fontSize: 16, color: savedNow ? TEAL : CHARCOAL }}>{savedNow ? "♥" : "♡"}</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <Image source={{ uri: business.image }} style={styles.hero} contentFit="cover" />

        <View style={styles.body}>
          {/* Title block */}
          <View style={styles.titleBlock}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{business.name}</Text>
              {business.verified ? (
                <View style={styles.verified}>
                  <BadgeCheck size={12} color="white" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.categoryLine}>
              {business.category} · {priceLabel(business.priceLevel)} · {business.neighborhood}
            </Text>
            <View style={styles.ratingRow}>
              <Stars rating={business.rating} size={13} />
              <Text style={styles.ratingText}>{business.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({business.reviewCount} reviews)</Text>
            </View>
          </View>

          {/* About */}
          <Text style={styles.about}>{business.description}</Text>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {business.tags.slice(0, 4).map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* Contact actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryAction]}
              onPress={() => Linking.openURL(whatsappUrl(business.whatsapp, whatsappMsg))}
            >
              <MessageCircle size={16} color="white" />
              <Text style={styles.primaryActionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryAction]}
              onPress={() => Linking.openURL(`tel:${business.phone.replace(/\D/g, "")}`)}
            >
              <Phone size={16} color={CHARCOAL} />
              <Text style={styles.secondaryActionText}>Call</Text>
            </TouchableOpacity>
          </View>

          {/* Storefront */}
          {products.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <ShoppingBag size={16} color={CHARCOAL} />
                <Text style={styles.sectionTitle}>Storefront</Text>
                <Text style={styles.sectionNote}>{products.length} items</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
                {products.map((p) => (
                  <View key={p.id} style={[styles.productCard, p.soldOut && styles.productSoldOut]}>
                    {p.image ? <Image source={{ uri: p.image }} style={styles.productImage} contentFit="cover" /> : null}
                    <View style={styles.productBody}>
                      <Text style={styles.productName} numberOfLines={2}>{p.name}</Text>
                      <Text style={styles.productPrice}>{p.price}</Text>
                      {p.stock !== null && p.stock > 0 && p.stock <= 5 ? (
                        <Text style={styles.productStock}>Only {p.stock} left</Text>
                      ) : null}
                      {p.soldOut ? <Text style={styles.productStock}>Sold out</Text> : null}
                    </View>
                    <TouchableOpacity
                      style={styles.productCta}
                      disabled={p.soldOut}
                      onPress={() =>
                        Linking.openURL(
                          whatsappUrl(business.whatsapp, `Hello ${business.name}, I'd like to order: ${p.name} (${p.price})`)
                        )
                      }
                    >
                      <Text style={styles.productCtaText}>{p.soldOut ? "Sold out" : "Order"}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}

          {/* Services */}
          {business.services.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <Sparkles size={16} color={CHARCOAL} />
                <Text style={styles.sectionTitle}>Services</Text>
              </View>
              <View style={styles.serviceList}>
                {business.services.map((s) => (
                  <View key={s.name} style={styles.serviceRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.serviceName}>{s.name}</Text>
                      {s.duration ? <Text style={styles.serviceDuration}>{s.duration}</Text> : null}
                    </View>
                    <Text style={styles.servicePrice}>{s.price}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Hours + location */}
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Clock size={16} color={CHARCOAL} />
              <Text style={styles.sectionTitle}>Hours & location</Text>
            </View>
            {business.hours.slice(0, 7).map((h) => (
              <View key={h.day} style={styles.hoursRow}>
                <Text style={styles.hoursDay}>{h.day}</Text>
                <Text style={styles.hoursTime}>{h.open} – {h.close}</Text>
              </View>
            ))}
            <View style={styles.addressRow}>
              <MapPin size={14} color={MUTED} />
              <Text style={styles.addressText}>{business.address}</Text>
            </View>
            {business.website ? (
              <TouchableOpacity
                style={styles.addressRow}
                onPress={() => Linking.openURL(business.website.startsWith("http") ? business.website : `https://${business.website}`)}
              >
                <Globe size={14} color={MUTED} />
                <Text style={[styles.addressText, { color: TEAL }]}>{business.website}</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <Text style={styles.sectionNote}>{reviews.length}</Text>
            </View>
            {reviews.map((r) => (
              <View key={r.id} style={styles.reviewCard}>
                <View style={styles.reviewHead}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {r.author.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.reviewNameRow}>
                      <Text style={styles.reviewAuthor}>{r.author}</Text>
                      {r.verifiedVisit ? (
                        <View style={styles.visitBadge}>
                          <Text style={styles.visitText}>Verified visit</Text>
                        </View>
                      ) : null}
                    </View>
                    <Stars rating={r.rating} size={10} />
                  </View>
                </View>
                <Text style={styles.reviewText}>{r.text}</Text>
                {r.reply ? (
                  <View style={styles.replyCard}>
                    <Text style={styles.replyLabel}>Reply from {business.name}</Text>
                    <Text style={styles.replyText}>{r.reply}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky WhatsApp bar */}
      <View style={styles.stickyBar}>
        <TouchableOpacity
          style={styles.stickyButton}
          onPress={() => Linking.openURL(whatsappUrl(business.whatsapp, whatsappMsg))}
        >
          <MessageCircle size={18} color="white" />
          <Text style={styles.stickyButtonText}>Chat on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
  backButton: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: "white",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  headerActions: { flexDirection: "row", gap: 8 },
  saveActive: { backgroundColor: "#F0FDFA" },
  hero: { width: "100%", height: 240 },
  body: { paddingHorizontal: 20, paddingTop: 18 },
  titleBlock: { gap: 8, marginBottom: 14 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 24, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL, flexShrink: 1 },
  verified: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: TEAL, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  verifiedText: { color: "white", fontSize: 10, fontFamily: "Inter_700Bold" },
  categoryLine: { fontSize: 13, color: MUTED, fontFamily: "Inter_500Medium" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingText: { fontSize: 13, fontFamily: "Inter_700Bold", color: CHARCOAL },
  reviewCount: { fontSize: 12, color: MUTED },
  about: { fontSize: 14, lineHeight: 22, color: "#4B5563", fontFamily: "Inter_400Regular", marginBottom: 14 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  tag: { backgroundColor: "#F3F4F6", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  tagText: { fontSize: 11, color: "#4B5563", fontFamily: "Inter_600SemiBold" },
  actionRow: { flexDirection: "row", gap: 10, marginBottom: 22 },
  actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: 14 },
  primaryAction: { backgroundColor: "#25D366" },
  primaryActionText: { color: "white", fontSize: 14, fontFamily: "Inter_700Bold" },
  secondaryAction: { backgroundColor: "#F3F4F6" },
  secondaryActionText: { color: CHARCOAL, fontSize: 14, fontFamily: "Inter_700Bold" },
  section: { marginBottom: 24 },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL, flex: 1 },
  sectionNote: { fontSize: 12, color: MUTED, fontFamily: "Inter_600SemiBold" },
  productScroll: { gap: 12 },
  productCard: {
    width: 150, borderRadius: 16, borderWidth: 1, borderColor: "#F3F4F6",
    backgroundColor: "white", overflow: "hidden",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  productSoldOut: { opacity: 0.6 },
  productImage: { width: "100%", height: 90 },
  productBody: { padding: 10, gap: 4 },
  productName: { fontSize: 13, fontFamily: "Inter_700Bold", color: CHARCOAL, minHeight: 32 },
  productPrice: { fontSize: 13, fontFamily: "Inter_700Bold", color: TEAL },
  productStock: { fontSize: 10, color: "#D97706", fontFamily: "Inter_600SemiBold" },
  productCta: { backgroundColor: CHARCOAL, margin: 10, marginTop: 2, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  productCtaText: { color: "white", fontSize: 12, fontFamily: "Inter_700Bold" },
  serviceList: { gap: 8 },
  serviceRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", borderRadius: 12, padding: 14 },
  serviceName: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: CHARCOAL },
  serviceDuration: { fontSize: 11, color: MUTED, marginTop: 2 },
  servicePrice: { fontSize: 13, fontFamily: "Inter_700Bold", color: TEAL },
  hoursRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#F9FAFB" },
  hoursDay: { fontSize: 13, color: "#4B5563", fontFamily: "Inter_500Medium" },
  hoursTime: { fontSize: 13, color: CHARCOAL, fontFamily: "Inter_600SemiBold" },
  addressRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  addressText: { fontSize: 13, color: "#4B5563", fontFamily: "Inter_500Medium", flexShrink: 1 },
  reviewCard: { borderWidth: 1, borderColor: "#F3F4F6", borderRadius: 14, padding: 14, marginBottom: 10, gap: 8 },
  reviewHead: { flexDirection: "row", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F0FDFA", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 12, color: TEAL, fontFamily: "Inter_700Bold" },
  reviewNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  reviewAuthor: { fontSize: 13, fontFamily: "Inter_700Bold", color: CHARCOAL },
  visitBadge: { backgroundColor: "#DCFCE7", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  visitText: { fontSize: 9, color: "#166534", fontFamily: "Inter_700Bold" },
  reviewText: { fontSize: 13, lineHeight: 20, color: "#4B5563", fontFamily: "Inter_400Regular" },
  replyCard: { backgroundColor: "#F9FAFB", borderRadius: 10, padding: 10, gap: 3 },
  replyLabel: { fontSize: 11, color: TEAL, fontFamily: "Inter_700Bold" },
  replyText: { fontSize: 12, lineHeight: 18, color: "#4B5563", fontFamily: "Inter_400Regular" },
  stickyBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 24, backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1, borderTopColor: "#F3F4F6",
  },
  stickyButton: {
    backgroundColor: "#25D366", flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, height: 52, borderRadius: 16,
    shadowColor: "#25D366", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4,
  },
  stickyButtonText: { color: "white", fontSize: 15, fontFamily: "Inter_700Bold" },
});

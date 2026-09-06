import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, MessageCircle, Store, HelpCircle, FileText, Shield } from "lucide-react-native";

const TEAL = "#14B8A6";
const CHARCOAL = "#121212";

const ROWS = [
  { icon: Store, label: "List your business on Finda", note: "Get verified. Get customers.", tint: "#F0FDFA", fg: TEAL },
  { icon: MessageCircle, label: "Contact support", note: "We reply fast on WhatsApp", tint: "#DCFCE7", fg: "#16A34A" },
  { icon: HelpCircle, label: "Help center", note: "", tint: "#FEF3C7", fg: "#D97706" },
  { icon: FileText, label: "Terms of service", note: "", tint: "#F3F4F6", fg: "#4B5563" },
  { icon: Shield, label: "Privacy policy", note: "", tint: "#F3F4F6", fg: "#4B5563" },
];

export default function Profile() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>You're browsing as a guest</Text>
        </View>

        {/* Guest card */}
        <View style={styles.guestCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👋</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.guestTitle}>Welcome to Finda</Text>
            <Text style={styles.guestText}>
              Sign in to save businesses, follow your favorites, and get order updates.
            </Text>
          </View>
        </View>

        {/* Rows */}
        <View style={styles.rows}>
          {ROWS.map((row) => (
            <TouchableOpacity
              key={row.label}
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => {
                if (row.label === "Contact support") {
                  Linking.openURL("https://wa.me/2348000000000?text=Hello%20Finda%20support!");
                }
                // Other rows link out once the web domain is set in EXPO_PUBLIC_FINDA_API.
              }}
            >
              <View style={[styles.rowIcon, { backgroundColor: row.tint }]}>
                <row.icon size={18} color={row.fg} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                {row.note ? <Text style={styles.rowNote}>{row.note}</Text> : null}
              </View>
              <ChevronRight size={18} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>
          Finda · Discover trusted businesses in Lagos{"\n"}Made for neighborhoods, everywhere.
        </Text>

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
  guestCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 20,
    backgroundColor: "#F0FDFA",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#CCFBF1",
    marginBottom: 24,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: TEAL, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 22 },
  guestTitle: { fontSize: 16, fontFamily: "PlayfairDisplay_700Bold", color: CHARCOAL, marginBottom: 2 },
  guestText: { fontSize: 12, lineHeight: 18, color: "#4B5563", fontFamily: "Inter_400Regular" },
  rows: { paddingHorizontal: 20, gap: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 14,
  },
  rowIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rowLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: CHARCOAL },
  rowNote: { fontSize: 11, color: "#6B7280", marginTop: 2, fontFamily: "Inter_400Regular" },
  footer: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: "#9CA3AF",
    fontFamily: "Inter_400Regular",
  },
});

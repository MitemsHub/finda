import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, MapPin, Star, Phone, Utensils, Dumbbell, Sparkles, Monitor, ShoppingBag, Stethoscope, GraduationCap, MoreHorizontal } from 'lucide-react-native';
import { Image } from 'expo-image';

const TEAL = '#14B8A6';
const CHARCOAL = '#121212';
const INDIGO = '#6366F1';

// Dummy Data
const CATEGORIES = [
  { id: '1', name: 'Food &\nDining', icon: Utensils, color: '#DCFCE7', iconColor: '#166534' },
  { id: '2', name: 'Fitness &\nWellness', icon: Dumbbell, color: '#DBEAFE', iconColor: '#1E40AF' },
  { id: '3', name: 'Beauty &\nSpa', icon: Sparkles, color: '#FAE8FF', iconColor: '#86198F' },
  { id: '4', name: 'Tech &\nRepair', icon: Monitor, color: '#FFEDD5', iconColor: '#9A3412' },
  { id: '5', name: 'Shopping', icon: ShoppingBag, color: '#FCE7F3', iconColor: '#9D174D' },
  { id: '6', name: 'Healthcare', icon: Stethoscope, color: '#E0E7FF', iconColor: '#3730A3' },
  { id: '7', name: 'Education', icon: GraduationCap, color: '#D1FAE5', iconColor: '#065F46' },
  { id: '8', name: 'More', icon: MoreHorizontal, color: '#F3F4F6', iconColor: '#4B5563' },
];

const TRENDING_BUSINESSES = [
  {
    id: '1',
    name: 'Artisan Brew',
    category: 'Coffee Shop',
    distance: '0.4 mi away',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Peak Fitness',
    category: 'Gym',
    distance: '0.6 mi away',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'La Cucina',
    category: 'Italian',
    distance: '0.8 mi away',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
  },
];

const POPULAR_THIS_WEEK = [
  {
    id: '1',
    name: 'Morning Blend Café',
    category: 'Café',
    distance: '0.3 mi • Main St',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=200&auto=format&fit=crop',
    color: '#E0F2FE',
    textColor: '#0284C7'
  },
  {
    id: '2',
    name: 'Gourmet House',
    category: 'Fine Dining',
    distance: '0.5 mi • Park Ave',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=200&auto=format&fit=crop',
    color: '#DCFCE7',
    textColor: '#166534'
  },
  {
    id: '3',
    name: 'Elite Fitness Hub',
    category: 'Gym',
    distance: '0.7 mi • Oak Blvd',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=200&auto=format&fit=crop',
    color: '#DBEAFE',
    textColor: '#1E40AF'
  },
];

const NEARBY_SERVICES = [
  {
    id: '1',
    name: 'Auto Care Center',
    category: 'Car Repair & Service',
    distance: '1.2 mi away',
    icon: 'car', // Placeholder for icon logic if not using image
    iconBg: '#DCFCE7',
    iconColor: TEAL
  },
  {
    id: '2',
    name: 'Style Salon & Spa',
    category: 'Hair & Beauty',
    distance: '3.6 mi away',
    icon: 'scissors',
    iconBg: '#FAE8FF',
    iconColor: '#C026D3'
  },
  {
    id: '3',
    name: 'Bright Smile Dental',
    category: 'Dental Clinic',
    distance: '1.5 mi away',
    icon: 'smile',
    iconBg: '#DBEAFE',
    iconColor: '#2563EB'
  },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Verified', 'Nearby', 'Open Now', 'Top Rated'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                <cat.icon size={24} color={cat.iconColor} />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Business */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Businesses</Text>
          <TouchableOpacity><Text style={styles.seeAll}>View All</Text></TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.9}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop' }}
            style={styles.featuredCard}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.featuredOverlay}>
              <View style={styles.featuredBadge}>
                <Sparkles size={12} color="white" />
                <Text style={styles.featuredBadgeText}>Premium Featured</Text>
              </View>
              <View>
                <Text style={styles.featuredTitle}>Skyline Rooftop Bar</Text>
                <Text style={styles.featuredSubtitle}>Experience luxury dining with panoramic city views</Text>
                <View style={styles.featuredMeta}>
                  <MapPin size={14} color="white" />
                  <Text style={styles.featuredMetaText}>0.2 mi • Downtown Plaza</Text>
                </View>
                <TouchableOpacity style={styles.reserveButton}>
                  <Text style={styles.reserveButtonText}>Reserve Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Trending Now */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingScroll}>
          {TRENDING_BUSINESSES.map((item) => (
            <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.9}>
              <Image source={{ uri: item.image }} style={styles.trendingImage} contentFit="cover" />
              <View style={styles.trendingContent}>
                <Text style={styles.trendingName}>{item.name}</Text>
                <View style={styles.trendingCategoryRow}>
                  <Text style={styles.trendingCategory}>{item.category}</Text>
                </View>
                <View style={styles.trendingMeta}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={styles.trendingDistance}>{item.distance}</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular This Week */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          <TouchableOpacity><Text style={styles.seeAll}>View All</Text></TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {POPULAR_THIS_WEEK.map((item) => (
            <TouchableOpacity key={item.id} style={styles.popularItem}>
              <Image source={{ uri: item.image }} style={styles.popularImage} />
              <View style={styles.popularContent}>
                <Text style={styles.popularName}>{item.name}</Text>
                <View style={[styles.popularCategoryBadge, { backgroundColor: item.color }]}>
                  <Text style={[styles.popularCategoryText, { color: item.textColor }]}>{item.category}</Text>
                </View>
                <View style={styles.popularMeta}>
                  <MapPin size={12} color="#9CA3AF" />
                  <Text style={styles.popularDistance}>{item.distance}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Phone size={18} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Services</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {NEARBY_SERVICES.map((item) => (
            <View key={item.id} style={styles.nearbyItem}>
              <View style={[styles.nearbyIcon, { backgroundColor: item.iconBg }]}>
                {/* Just using generic icons for now based on index/type simulation */}
                {item.id === '1' && <Monitor size={20} color={item.iconColor} />}
                {item.id === '2' && <Sparkles size={20} color={item.iconColor} />}
                {item.id === '3' && <Stethoscope size={20} color={item.iconColor} />}
              </View>
              <View style={styles.nearbyContent}>
                <Text style={styles.nearbyName}>{item.name}</Text>
                <Text style={styles.nearbyCategory}>{item.category}</Text>
                <View style={styles.nearbyMeta}>
                  <MapPin size={12} color="#9CA3AF" />
                  <Text style={styles.nearbyDistance}>{item.distance}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Bottom Padding */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontWeight: '700',
    color: CHARCOAL,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter_500Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: CHARCOAL,
    outlineStyle: 'none',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: TEAL,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersScroll: {
    marginBottom: 24,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterChipActive: {
    backgroundColor: TEAL,
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#6B7280',
  },
  filterTextActive: {
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold', // Using Playfair for headings as per design system feel
    color: CHARCOAL,
    fontWeight: '700', // Fallback
  },
  seeAll: {
    fontSize: 13,
    color: TEAL,
    fontFamily: 'Inter_600SemiBold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryItem: {
    width: '23%', // 4 items per row roughly
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    color: CHARCOAL,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    lineHeight: 14,
  },
  featuredCard: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  featuredOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)', // Darken bottom
  },
  featuredBadge: {
    position: 'absolute',
    top: -120, // Adjust based on layout
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 184, 166, 0.9)', // Teal with opacity
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 4,
  },
  featuredSubtitle: {
    color: '#E5E7EB',
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  featuredMetaText: {
    color: '#E5E7EB',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  reserveButton: {
    backgroundColor: CHARCOAL,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  trendingScroll: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 24,
  },
  trendingCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  trendingImage: {
    width: '100%',
    height: 120,
  },
  trendingContent: {
    padding: 12,
  },
  trendingName: {
    fontSize: 15,
    fontWeight: '700',
    color: CHARCOAL,
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  trendingCategoryRow: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  trendingCategory: {
    fontSize: 10,
    color: '#0284C7',
    fontWeight: '600',
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  trendingDistance: {
    fontSize: 11,
    color: '#6B7280',
  },
  viewDetailsButton: {
    backgroundColor: TEAL,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  popularImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  popularContent: {
    flex: 1,
    marginLeft: 12,
  },
  popularName: {
    fontSize: 15,
    fontWeight: '700',
    color: CHARCOAL,
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  popularCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  popularCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  popularMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularDistance: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: CHARCOAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // Slightly different bg to distinguish
    padding: 12,
    borderRadius: 16,
  },
  nearbyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyContent: {
    flex: 1,
    marginLeft: 12,
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '700',
    color: CHARCOAL,
    marginBottom: 2,
    fontFamily: 'Inter_700Bold',
  },
  nearbyCategory: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  nearbyDistance: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  nearbyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    backgroundColor: TEAL,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});

import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Compass, Bookmark, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const TEAL = '#14B8A6';
const CHARCOAL = '#121212';

// Custom Tab Bar Background
const TabBarBackground = () => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
    );
  }
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]} />;
};

const TabIcon = ({ Icon, color, size, focused }: { Icon: any, color: string, size: number, focused: boolean }) => {
  return (
    <View style={[
      styles.iconContainer,
      focused && styles.iconContainerFocused
    ]}>
      <Icon size={size} color={focused ? 'white' : color} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: TEAL,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: () => <TabBarBackground />,
        tabBarItemStyle: { justifyContent: 'center', alignItems: 'center', paddingVertical: 4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={Home} color={color} size={20} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={Compass} color={color} size={20} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={Bookmark} color={color} size={20} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon Icon={User} color={color} size={20} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Handled by TabBarBackground
    borderTopWidth: 0,
    elevation: 0,
    height: 80, // Taller to accommodate the pill shape if needed or just breathing room
    paddingBottom: 20, // Push up from home indicator
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
  iconContainer: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconContainerFocused: {
    backgroundColor: TEAL,
    width: 48,
    height: 32,
    borderRadius: 16,
  },
});

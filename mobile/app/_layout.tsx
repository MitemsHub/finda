import 'react-native-reanimated';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { 
  useFonts as usePlayfairFonts, 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
} from '@expo-google-fonts/playfair-display';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { View, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CHARCOAL = '#121212';

// Fake Status Bar for Web Frame
const WebStatusBar = () => (
  <View style={{ 
    width: '100%', 
    height: 44, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    backgroundColor: 'white', // Or transparent if you want overlap
    zIndex: 100,
  }}>
    <Text style={{ fontWeight: '600', fontSize: 15 }}>9:41</Text>
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
      <Ionicons name="cellular" size={16} color="black" />
      <Ionicons name="wifi" size={16} color="black" />
      <Ionicons name="battery-full" size={20} color="black" />
    </View>
  </View>
);

// Fake Home Indicator
const WebHomeIndicator = () => (
  <View style={{ 
    position: 'absolute', 
    bottom: 8, 
    alignSelf: 'center', 
    width: 134, 
    height: 5, 
    backgroundColor: '#000', 
    borderRadius: 10,
    zIndex: 100,
  }} />
);

// Wrapper component to simulate mobile frame on web
const MobileFrame = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <View style={{
          width: 375, // Standard mobile width
          height: 812, // Standard mobile height
          borderRadius: 40,
          overflow: 'hidden',
          backgroundColor: 'white',
          borderWidth: 10,
          borderColor: '#111',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.5,
          shadowRadius: 40,
          position: 'relative', // For absolute positioning of indicator
        }}>
          <WebStatusBar />
          <View style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </View>
          <WebHomeIndicator />
        </View>
      </View>
    );
  }
  return <>{children}</>;
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const [playfairLoaded, playfairError] = usePlayfairFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black,
  });

  useEffect(() => {
    if (error) throw error;
    if (playfairError) throw playfairError;
  }, [error, playfairError]);

  useEffect(() => {
    if (fontsLoaded && playfairLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, playfairLoaded]);

  if (!fontsLoaded || !playfairLoaded) {
    return null;
  }

  return (
    <MobileFrame>
      <StatusBar style="dark" />
      <Slot />
    </MobileFrame>
  );
}

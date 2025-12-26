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
  Inter_900Black 
} from '@expo-google-fonts/inter';
import { 
  useFonts as usePlayfairFonts, 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black
} from '@expo-google-fonts/playfair-display';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  );
}

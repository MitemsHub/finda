import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: {
      getItem: async (key: string) => {
        if (Platform.OS === 'web') return localStorage.getItem(key);
        const secureStore = await import('expo-secure-store');
        return await secureStore.getItemAsync(key);
      },
      setItem: async (key: string, value: string) => {
        if (Platform.OS === 'web') return localStorage.setItem(key, value);
        const secureStore = await import('expo-secure-store');
        await secureStore.setItemAsync(key, value);
      },
      removeItem: async (key: string) => {
        if (Platform.OS === 'web') return localStorage.removeItem(key);
        const secureStore = await import('expo-secure-store');
        await secureStore.deleteItemAsync(key);
      },
    },
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});


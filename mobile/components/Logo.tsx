import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { CompassIcon, TEAL, INDIGO } from './icons/CompassIcon';

interface LogoProps {
  size?: number;
  animated?: boolean;
}

export const Logo = ({ size = 128, animated = true }: LogoProps) => {
  const logoTranslateY = useSharedValue(0);
  const logoScale = useSharedValue(1);
  const compassRotate = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;

    const duration = 3000;
    const easing = Easing.inOut(Easing.ease);

    logoTranslateY.value = withRepeat(
      withTiming(-10, { duration: 1500, easing }),
      -1,
      true
    );
    logoScale.value = withRepeat(
      withTiming(1.05, { duration: 1500, easing }),
      -1,
      true
    );

    compassRotate.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, [animated]);

  const logoContainerStyle = useAnimatedStyle(() => ({
    transform: animated ? [{ translateY: logoTranslateY.value }, { scale: logoScale.value }] : [],
  }));

  const compassStyle = useAnimatedStyle(() => ({
    transform: animated ? [{ rotate: `${compassRotate.value}deg` }] : [],
  }));

  return (
    <Animated.View style={[{ width: size, height: size }, logoContainerStyle]}>
      <View style={{
        width: '100%', height: '100%', borderRadius: size * 0.1875, 
        // Shadow Container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: size * 0.2 },
        shadowOpacity: 0.25,
        shadowRadius: size * 0.4,
        elevation: 24,
        backgroundColor: 'transparent',
      }}>
        {/* Clipped Content Container */}
        <View style={{
          flex: 1, borderRadius: size * 0.1875, overflow: 'hidden',
          backgroundColor: TEAL,
        }}>
           <BlurView intensity={20} tint="light" style={[StyleSheet.absoluteFillObject, { borderRadius: size * 0.1875 }]} />
           <LinearGradient
              colors={[TEAL, INDIGO]}
              style={[StyleSheet.absoluteFillObject, { opacity: 0.85, borderRadius: size * 0.1875 }]} 
           />
           <LinearGradient
             colors={['rgba(255,255,255,0.2)', 'transparent']}
             style={[StyleSheet.absoluteFillObject, { margin: size * 0.06, borderRadius: size * 0.125 }]}
           />
           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Animated.View style={compassStyle}>
               <CompassIcon width={size * 0.5} height={size * 0.5} />
             </Animated.View>
           </View>
           <LinearGradient
             colors={['transparent', 'transparent', 'rgba(255,255,255,0.1)']}
             style={[StyleSheet.absoluteFillObject, { borderRadius: size * 0.1875 }]}
           />
        </View>
      </View>
    </Animated.View>
  );
};

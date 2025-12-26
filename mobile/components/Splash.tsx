import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Platform } from 'react-native';
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
import Svg, { Circle, Path, Defs, LinearGradient as LinearGradientSVG, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// --- Colors ---
const TEAL = '#14B8A6';
const INDIGO = '#6366F1';
const CHARCOAL = '#121212';

// --- Animations ---
const PulseRing = ({ delay = 0, size = 128 }: { delay?: number; size?: number }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(2.5, { duration: 2000, easing: Easing.bezier(0.455, 0.03, 0.515, 0.955) }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0, { duration: 2000, easing: Easing.bezier(0.455, 0.03, 0.515, 0.955) }),
        -1,
        false
      )
    );
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: 9999,
          backgroundColor: 'rgba(20, 184, 166, 0.3)',
        },
        style,
      ]}
    />
  );
};

const Sparkle = ({
  top,
  left,
  right,
  bottom,
  color,
  size,
  delay = 0,
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  color: string;
  size: number;
  delay?: number;
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    const duration = 2000;
    const easing = Easing.inOut(Easing.ease);

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration / 2, easing }),
          withTiming(0, { duration: duration / 2, easing })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration / 2, easing }),
          withTiming(0, { duration: duration / 2, easing })
        ),
        -1,
        false
      )
    );
    rotate.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(180, { duration: duration / 2, easing }),
          withTiming(360, { duration: duration / 2, easing })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top,
          left,
          right,
          bottom,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: 9999,
        },
        style,
      ]}
    />
  );
};

// Custom Compass Icon Component
const CompassIcon = () => (
  <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* White Circle Background */}
    <Circle cx="32" cy="32" r="32" fill="white" />
    {/* Compass Needle (Diamond) */}
    {/* Gradient Needle Match - using a mask or solid color that matches TEAL/INDIGO */}
    {/* For vector simplicity, we use TEAL but the prompt asks for same color as square. */}
    {/* The square is a gradient. SVG needs Defs for gradient. */}
    <Defs>
      <LinearGradientSVG id="needleGradient" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor={TEAL} />
        <Stop offset="1" stopColor={INDIGO} />
      </LinearGradientSVG>
    </Defs>
    {/* Diamond Shape: Not pointy at edges -> Rounded joins or slightly wider path? */}
    {/* Screenshot shows a diamond with slightly rounded corners or just a standard diamond. */}
    {/* "spinning shape is not pointy at the edge" -> suggests rounded lineJoin/Cap or a specific path. */}
    {/* Let's round the corners of the diamond path. */}
    <Path 
      d="M32 14L42 32L32 50L22 32L32 14Z" 
      fill="url(#needleGradient)" 
      strokeLinejoin="round" 
      strokeWidth="4"
      stroke="url(#needleGradient)"
    />
    {/* Detail: Center Dot */}
    <Circle cx="32" cy="32" r="5" fill="white" />
  </Svg>
);

export default function Splash() {
  // --- Logo Float Animation ---
  const logoTranslateY = useSharedValue(0);
  const logoScale = useSharedValue(1);

  useEffect(() => {
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
  }, []);

  const logoContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoTranslateY.value }, { scale: logoScale.value }],
  }));

  // --- Compass Spin Animation ---
  const compassRotate = useSharedValue(0);
  useEffect(() => {
    compassRotate.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${compassRotate.value}deg` }],
  }));

  // --- Entry Animations ---
  const fadeInOpacity = useSharedValue(0);
  const slideUpTranslateY = useSharedValue(30);
  const slideUpOpacity = useSharedValue(0);

  useEffect(() => {
    fadeInOpacity.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) });

    slideUpTranslateY.value = withDelay(
      1000,
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) })
    );
    slideUpOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) })
    );
  }, []);

  const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInOpacity.value }));
  const slideUpStyle = useAnimatedStyle(() => ({
    opacity: slideUpOpacity.value,
    transform: [{ translateY: slideUpTranslateY.value }],
  }));

  // --- Mobile Frame Wrapper for Web ---
  const isWeb = Platform.OS === 'web';
  
  const Content = () => (
    <View style={{ flex: 1, backgroundColor: CHARCOAL, overflow: 'hidden', minHeight: '100%' }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#14B8A6', '#0D9488', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Dark Overlay */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />

      {/* Center Content Container */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
        
        {/* Background Lines (Absolute to container) */}
        <Animated.View style={[{ position: 'absolute', top: '50%', left: 40, width: 1, height: 80, marginTop: -40 }, fadeInStyle]}>
          <LinearGradient colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View style={[{ position: 'absolute', top: '50%', right: 40, width: 1, height: 80, marginTop: -40 }, fadeInStyle]}>
          <LinearGradient colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View style={[{ position: 'absolute', top: '33%', left: '33%', width: 1, height: 64, transform: [{ rotate: '45deg' }] }, fadeInStyle]}>
          <LinearGradient colors={['rgba(20, 184, 166, 0.3)', 'transparent']} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View style={[{ position: 'absolute', bottom: '33%', right: '33%', width: 1, height: 64, transform: [{ rotate: '-45deg' }] }, fadeInStyle]}>
          <LinearGradient colors={['rgba(99, 102, 241, 0.3)', 'transparent']} start={{x:0,y:1}} end={{x:0,y:0}} style={{ flex: 1 }} />
        </Animated.View>

        {/* Sparkles */}
        <Sparkle top={40} left={40} size={16} color="rgba(255,255,255,0.3)" delay={0} />
        <Sparkle top={80} right={80} size={12} color="rgba(20, 184, 166, 0.5)" delay={500} />
        <Sparkle bottom={128} left={64} size={8} color="rgba(99, 102, 241, 0.4)" delay={1000} />
        <Sparkle bottom={80} right={128} size={20} color="rgba(255,255,255,0.2)" delay={1500} />

        {/* Logo Section */}
        <View style={{ marginBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
          <PulseRing delay={0} size={128} />
          <PulseRing delay={500} size={112} />

          <Animated.View style={[logoContainerStyle]}>
             <View style={{
               width: 128, height: 128, borderRadius: 24, 
               // Shadow Container
               shadowColor: '#000',
               shadowOffset: { width: 0, height: 25 },
               shadowOpacity: 0.25,
               shadowRadius: 50,
               elevation: 24,
               backgroundColor: 'transparent',
             }}>
               {/* Clipped Content Container */}
               <View style={{
                 flex: 1, borderRadius: 24, overflow: 'hidden',
                 // Fallback background
                 backgroundColor: TEAL,
               }}>
                  <BlurView intensity={20} tint="light" style={[StyleSheet.absoluteFillObject, { borderRadius: 24 }]} />
                  <LinearGradient
                     colors={[TEAL, INDIGO]}
                     style={[StyleSheet.absoluteFillObject, { opacity: 0.85, borderRadius: 24 }]} 
                  />
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'transparent']}
                    style={[StyleSheet.absoluteFillObject, { margin: 8, borderRadius: 16 }]}
                  />
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View style={compassStyle}>
                      <CompassIcon />
                    </Animated.View>
                  </View>
                  <LinearGradient
                    colors={['transparent', 'transparent', 'rgba(255,255,255,0.1)']}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 24 }]}
                  />
               </View>
             </View>
          </Animated.View>
        </View>

        {/* Text Section */}
        <Animated.View style={[{ alignItems: 'center' }, fadeInStyle]}>
          <Text style={{
            fontFamily: 'Inter_900Black',
            fontSize: 60,
            color: 'white',
            letterSpacing: -2,
            marginBottom: 8,
            textShadowColor: 'rgba(20, 184, 166, 0.4)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 20,
            includeFontPadding: false,
            textAlign: 'center',
          }}>
            Finda
          </Text>

          {/* Loader Dots in Middle */}
          <Animated.View style={[{ flexDirection: 'row', gap: 8, marginBottom: 16 }, slideUpStyle]}>
            {[0, 200, 400].map((d, i) => (
              <LoaderDot key={i} delay={d} />
            ))}
          </Animated.View>

          <Animated.Text style={[{
            fontFamily: 'Inter_500Medium',
            fontSize: 18,
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
          }, slideUpStyle]}>
            Discover Amazing Businesses
          </Animated.Text>

          {/* Divider */}
          <Animated.View style={[{
            width: 80, height: 4, borderRadius: 9999, marginTop: 24, overflow: 'hidden'
          }, slideUpStyle]}>
            <LinearGradient
              colors={[TEAL, INDIGO]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </Animated.View>

      </View>
    </View>
  );

  if (isWeb) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <View style={{
          width: 390,
          height: 844,
          borderRadius: 40,
          overflow: 'hidden',
          backgroundColor: CHARCOAL,
          borderWidth: 8,
          borderColor: '#111',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.5,
          shadowRadius: 40,
        }}>
          <Content />
        </View>
      </View>
    );
  }

  return <Content />;
}

const LoaderDot = ({ delay }: { delay: number }) => {
  const opacity = useSharedValue(0.5);
  
  useEffect(() => {
    opacity.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 })
      ),
      -1,
      true
    ));
  }, [delay]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  
  return (
    <Animated.View style={[{ width: 8, height: 8, borderRadius: 9999, backgroundColor: TEAL }, style]} />
  );
};


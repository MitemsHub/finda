import React from 'react';
import Svg, { Circle, Path, Defs, LinearGradient as LinearGradientSVG, Stop } from 'react-native-svg';

export const TEAL = '#14B8A6';
export const INDIGO = '#6366F1';

interface CompassIconProps {
  width?: number;
  height?: number;
}

export const CompassIcon = ({ width = 64, height = 64 }: CompassIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
    {/* White Circle Background */}
    <Circle cx="32" cy="32" r="32" fill="white" />
    
    <Defs>
      <LinearGradientSVG id="needleGradient" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor={TEAL} />
        <Stop offset="1" stopColor={INDIGO} />
      </LinearGradientSVG>
    </Defs>
    
    {/* Gradient Needle Match */}
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

import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { Dimensions } from 'react-native';

const RadialGradientBackground = () => {
  const { width, height } = Dimensions.get('window');
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <Svg height="100%" width="100%" viewBox={viewBox}>
      <Defs>
        <RadialGradient
          id="grad"
          cx="100%"
          cy="100%"
          r="90%"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#E7FFDC" stopOpacity="1" />
          <Stop offset="1" stopColor="white" stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default RadialGradientBackground;
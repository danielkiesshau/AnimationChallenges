import { Animated } from 'react-native';

interface TabOffset {
  x: Animated.Value | Animated.AnimatedAddition;
  y: Animated.Value | Animated.AnimatedAddition;
}

export default TabOffset;

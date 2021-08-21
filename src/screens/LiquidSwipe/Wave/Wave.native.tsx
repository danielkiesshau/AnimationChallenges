import React from 'react';
import { StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Vector } from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

import Side from '@screens/LiquidSwipe/modules/interfaces/Side';

interface Props {
  position: Vector<Animated.SharedValue<number>>;
  side: Side;
  activeSide: Animated.SharedValue<Side>;
  isTransitioning: Animated.SharedValue<boolean>;
  shouldFlip?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedMaskedView = Animated.createAnimatedComponent(MaskedView);

const Wave: React.FC<Props> = ({
  children,
  position,
  shouldFlip,
  side,
  activeSide,
  style,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const d = ['M 0 0', `H ${position.x.value}`, `V ${wHeight}`, 'H 0', 'Z'];

    return {
      d: d.join(' '),
    };
  }, [wWidth, wHeight]);

  const sideStyle = {
    transform: [
      {
        rotate: shouldFlip ? '180deg' : '0deg',
      },
    ],
  };

  const maskElement = (
    <Svg style={[StyleSheet.absoluteFill, sideStyle]}>
      <AnimatedPath animatedProps={animatedProps} fill="black" />
    </Svg>
  );

  const activeStyle = useAnimatedStyle(() => {
    const isActive = activeSide.value === side;
    return {
      zIndex: isActive ? 3 : 2,
    };
  }, [activeSide, side]);

  return (
    <AnimatedMaskedView
      style={[StyleSheet.absoluteFill, activeStyle, style]}
      maskElement={maskElement}>
      {children}
    </AnimatedMaskedView>
  );
};

export default Wave;

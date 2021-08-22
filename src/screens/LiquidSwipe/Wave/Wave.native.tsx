import React from 'react';
import { StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { clamp, vec2, Vector } from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

import Side from '@screens/LiquidSwipe/modules/interfaces/Side';
import {
  DEFAULT_PADDING,
  MIN_LEDGE,
} from '@screens/LiquidSwipe/Slide/Slide.styles';

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

const curve = (c1: Vector, c2: Vector, to: Vector): string => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const Wave: React.FC<Props> = ({
  children,
  position,
  shouldFlip,
  side,
  activeSide,
  isTransitioning,
  style,
}) => {
  const stepX = useDerivedValue(() => {
    const RADIUS = clamp(
      position.x.value,
      DEFAULT_PADDING - MIN_LEDGE,
      wWidth / 2.5,
    );

    // Straighten curve on transition
    return isTransitioning.value ? withSpring(0) : RADIUS / 2;
  });

  const animatedProps = useAnimatedProps(() => {
    const RADIUS = clamp(
      position.x.value,
      DEFAULT_PADDING - MIN_LEDGE,
      wWidth / 2.5,
    );
    const stepY = Math.max(position.x.value, DEFAULT_PADDING - MIN_LEDGE);

    // 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
    const C = RADIUS * 0.5522847498;

    // rectangle & bump form

    const p1 = vec2(position.x.value, position.y.value - 2 * stepY);
    const p2 = vec2(p1.x + stepX.value, p1.y + stepY);
    const p3 = vec2(p2.x + stepX.value, p2.y + stepY);
    const p4 = vec2(p3.x - stepX.value, p3.y + stepY);
    const p5 = vec2(p4.x - stepX.value, p4.y + stepY);

    // curves

    const c11 = vec2(p1.x, p1.y + C);
    const c12 = vec2(p2.x, p2.y);

    const c21 = vec2(p2.x, p2.y);
    const c22 = vec2(p3.x, p3.y - C);

    const c31 = vec2(p3.x, p3.y + C);
    const c32 = vec2(p4.x, p4.y);

    const c41 = vec2(p4.x, p4.y);
    const c42 = vec2(p5.x, p5.y - C);

    const d = [
      'M 0 0',
      `H ${p1.x}`,
      `V ${p1.y}`,
      curve(c11, c12, p2),
      curve(c21, c22, p3),
      curve(c31, c32, p4),
      curve(c41, c42, p5),
      `V ${wHeight}`,
      'H 0',
      'Z',
    ];

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

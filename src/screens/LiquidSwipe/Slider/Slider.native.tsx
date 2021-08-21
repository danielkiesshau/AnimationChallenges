import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import Side from '@screens/LiquidSwipe/modules/interfaces/Side';
import Wave from '@screens/LiquidSwipe/Wave/Wave.native';

interface Props {
  current: ReactNode;
  previous: ReactNode;
  next: ReactNode;
  activeSide: Animated.SharedValue<Side>;
  left: Vector<Animated.SharedValue<number>>;
  right: Vector<Animated.SharedValue<number>>;
  isTransitioningRight: Animated.SharedValue<boolean>;
  isTransitioningLeft: Animated.SharedValue<boolean>;
  onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
}

const SliderNative: React.FC<Props> = ({
  current,
  previous,
  next,
  activeSide,
  left,
  right,
  isTransitioningRight,
  isTransitioningLeft,
  onGestureEvent,
}) => {
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {previous && (
          <Wave
            position={left}
            side={Side.LEFT}
            activeSide={activeSide}
            isTransitioning={isTransitioningLeft}>
            {previous}
          </Wave>
        )}
        {next && (
          <Wave
            position={right}
            side={Side.RIGHT}
            shouldFlip
            activeSide={activeSide}
            isTransitioning={isTransitioningRight}>
            {next}
          </Wave>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SliderNative;

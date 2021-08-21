import React, { ReactNode, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';

import Side from '@screens/LiquidSwipe/modules/interfaces/Side';
import { DEFAULT_PADDING } from '@screens/LiquidSwipe/Slide/Slide.styles';

import SliderNative from './Slider.native';

const { width: wWidth } = Dimensions.get('window');

interface Props {
  current: ReactNode;
  previous: ReactNode;
  next: ReactNode;
  setIndex: (index: number) => void;
  setCurrIndex: (index: number) => void;
  index: number;
}

const SliderAnimated: React.FC<Props> = ({
  current,
  previous,
  next,
  index,
  setIndex,
  setCurrIndex,
}) => {
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const activeSide = useSharedValue(Side.NONE);
  const left = useVector();
  const right = useVector();

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      const isLeftSide = x < DEFAULT_PADDING;
      const isRightSide = x > wWidth - DEFAULT_PADDING;

      if (isLeftSide) {
        activeSide.value = Side.LEFT;
      } else if (isRightSide) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      const isLeftActive = activeSide.value === Side.LEFT;
      const isRightActive = activeSide.value === Side.RIGHT;

      if (isLeftActive) {
        left.x.value = x;
        left.y.value = y;
      } else if (isRightActive) {
        right.x.value = wWidth - x;
        right.y.value = y;
      }
    },
    onEnd: ({ x, velocityX }) => {
      const isLeftActive = activeSide.value === Side.LEFT;

      if (isLeftActive) {
        const snapPoints = [DEFAULT_PADDING, wWidth];
        const dest = snapPoint(x, velocityX, snapPoints);
        const moveToLeftPage = dest === wWidth;

        if (moveToLeftPage) {
          isTransitioningLeft.value = true;
        }
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value ? true : false,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (moveToLeftPage) {
              runOnJS(setCurrIndex)(index - 1);
              runOnJS(setIndex)(index - 1);
            } else {
              activeSide.value = Side.NONE;
            }
          },
        );
      } else {
        const snapPoints = [0, wWidth - DEFAULT_PADDING];
        const dest = snapPoint(x, velocityX, snapPoints);

        if (dest === 0) {
          isTransitioningRight.value = true;
        }
        right.x.value = withSpring(
          wWidth - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value ? true : false,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            const moveToRightPage = dest === 0;

            if (moveToRightPage) {
              runOnJS(setCurrIndex)(index + 1);
              runOnJS(setIndex)(index + 1);
            } else {
              activeSide.value = Side.NONE;
            }
          },
        );
      }
    },
  });

  useEffect(() => {
    left.x.value = 0;
    right.x.value = 0;
    left.x.value = withSpring(DEFAULT_PADDING);
    right.x.value = withSpring(DEFAULT_PADDING);
  }, [index, left.x, right.x]);

  return (
    <SliderNative
      current={current}
      previous={previous}
      next={next}
      activeSide={activeSide}
      left={left}
      right={right}
      isTransitioningRight={isTransitioningRight}
      isTransitioningLeft={isTransitioningLeft}
      onGestureEvent={onGestureEvent}
    />
  );
};

export default SliderAnimated;

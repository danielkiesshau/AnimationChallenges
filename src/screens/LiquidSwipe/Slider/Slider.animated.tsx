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
import {
  DEFAULT_PADDING,
  MIN_LEDGE,
} from '@screens/LiquidSwipe/Slide/Slide.styles';

import SliderNative from './Slider.native';

const { width: wWidth, height: wHeight } = Dimensions.get('window');
const CENTER_OF_WINDOW = wHeight / 2;

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
  const hasStartedDragging = useSharedValue(false);
  const activeSide = useSharedValue(Side.NONE);
  const left = useVector(0, CENTER_OF_WINDOW);
  const right = useVector(0, CENTER_OF_WINDOW);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      const isLeftSide = x < DEFAULT_PADDING;
      const isRightSide = x > wWidth - DEFAULT_PADDING;

      hasStartedDragging.value = true;

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
        right.y.value = wHeight - y;
      }
    },
    onEnd: ({ x, velocityX, velocityY }) => {
      const isLeftActive = activeSide.value === Side.LEFT;
      const isRightActive = activeSide.value === Side.RIGHT;
      hasStartedDragging.value = false;

      if (isLeftActive) {
        const snapPoints = [MIN_LEDGE, wWidth];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitioningLeft.value = dest === wWidth;

        if (!isTransitioningLeft.value) {
          activeSide.value = Side.NONE;
        }

        left.y.value = withSpring(CENTER_OF_WINDOW, { velocity: velocityY });
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value ? true : false,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningLeft.value) {
              isTransitioningLeft.value = false;
              runOnJS(setCurrIndex)(index - 1);
              runOnJS(setIndex)(index - 1);
            } else if (!hasStartedDragging.value) {
              activeSide.value = Side.NONE;
            }
          },
        );
      } else if (isRightActive) {
        const snapPoints = [0, wWidth - MIN_LEDGE];
        const dest = snapPoint(x, velocityX, snapPoints);
        isTransitioningRight.value = dest === 0;

        right.y.value = withSpring(CENTER_OF_WINDOW, { velocity: velocityY });
        right.x.value = withSpring(
          wWidth - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value ? true : false,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningRight.value) {
              isTransitioningRight.value = false;
              runOnJS(setCurrIndex)(index + 1);
              runOnJS(setIndex)(index + 1);
            } else if (!hasStartedDragging.value) {
              activeSide.value = Side.NONE;
            }
          },
        );
      }
    },
  });

  useEffect(() => {
    // Hide Sliders
    left.x.value = 0;
    right.x.value = 0;

    // Show Sliders
    left.x.value = withSpring(MIN_LEDGE);
    right.x.value = withSpring(MIN_LEDGE);

    // Centralize curve
    left.y.value = withSpring(CENTER_OF_WINDOW);
    right.y.value = withSpring(CENTER_OF_WINDOW);
  }, [index, right.x, left.x, left.y, right.y]);

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

import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Square, {
  MAX_HEIGHT,
  SQUARE_SIZE,
} from '@screens/StickySquare/Square/Square.animated';

const CENTER_SVG_SQUARE = (Dimensions.get('window').width - SQUARE_SIZE) / 2;

const StickySquareNative: React.FC<{}> = () => {
  const sticked = useSharedValue(true);
  const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return (
      sticking.value *
      interpolate(translateY.value, [0, MAX_HEIGHT], [0, 1], Extrapolate.CLAMP)
    );
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY, translationX }) => {
      translateY.value = translationY;

      const shouldUnstick = translationY > MAX_HEIGHT;

      if (shouldUnstick) {
        sticked.value = false;
      }

      const shouldDragHorizontally = !sticked.value;

      if (shouldDragHorizontally) {
        translateX.value = translationX;
      }
    },
    onEnd: ({ velocityY: velocity }) => {
      translateY.value = withSpring(0, { velocity }, () => {
        sticked.value = true;
      });
      translateX.value = withSpring(0, { velocity });
    },
  });

  const squareTranslation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: (1 - sticking.value) * translateY.value,
      },
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <SafeAreaView edges={['bottom']} style={{ paddingLeft: CENTER_SVG_SQUARE }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[squareTranslation]}>
          <Square progress={progress} />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default StickySquareNative;

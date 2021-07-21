import React, { useState } from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Tab from '@screens/ChromeTabs/modules/interfaces/Tab';
import tabPositions from '@screens/ChromeTabs/modules/mocks/tabPositions';

import TabCard from './TabCard.native';
import Styles from './TabCard.styles';

interface Props {
  tab: Tab;
  index: number;
}

type PanEventContext = {
  startX: number;
  startY: number;
};

const TabCardAnimated: React.FC<Props> = ({ tab, index }) => {
  const translateX = tabPositions[index].x;
  const translateY = tabPositions[index].y;
  const [isDraggingTab, setIsDragginTab] = useState<boolean>();
  const translationsX = useSharedValue(translateX);
  const translationsY = useSharedValue(translateY);

  const toggleDragging = (): void => {
    setIsDragginTab(!isDraggingTab);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanEventContext
  >({
    onStart: (_, context) => {
      context.startX = translationsX.value;
      context.startY = translationsY.value;
      runOnJS(toggleDragging)();
    },
    onActive: (event, context) => {
      translationsX.value = context.startX + event.translationX;
      translationsY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      translationsX.value = withTiming(translateX, undefined, () => {
        runOnJS(toggleDragging)();
      });
      translationsY.value = withTiming(translateY);
    },
  });

  const isFirstCol = index % 2 === 0;

  const spacings = isFirstCol
    ? Styles.tabSpacingFirstCol
    : Styles.tabSpacingSecondCol;

  const translateAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationsX.value,
        },
        {
          translateY: translationsY.value,
        },
      ],
    };
  }, [isDraggingTab]);

  const tabElevation = useAnimatedStyle(() => {
    return isDraggingTab ? { zIndex: 10 } : { zIndex: 1 };
  }, [isDraggingTab]);

  return (
    <Animated.View style={tabElevation}>
      {/* <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        simultaneousHandlers={[panRef]}> */}
      <Animated.View
        style={[
          Styles.tabsColumn,
          Styles.animatedTabCard,
          translateAnimationStyle,
          isDraggingTab && Styles.aboveTabCardZIndex,
        ]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <TabCard title={tab.title} style={spacings} />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
      {/* </LongPressGestureHandler> */}
    </Animated.View>
  );
};

export default TabCardAnimated;

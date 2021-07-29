import React, { useRef, useState } from 'react';
import {
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
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
import TAB_SIZE from '@screens/ChromeTabs/modules/enums/Tab';
import TabOffset from '@screens/ChromeTabs/modules/interfaces/TabOffset';

import TabCard from './TabCard.native';
import Styles from './TabCard.styles';

const DRAG_ACTIVE_AREA = {
  TOP_Y: 50,
  BOTTOM_Y: 30,
};

const ABSOLUTE_DRAG_DIFF = 190;

interface Props {
  tab: Tab;
  index: number;
  activeTabPosition: Animated.SharedValue<TabOffset | null>;
  switchToTabPosition: Animated.SharedValue<TabOffset | null>;
  activeTabX: Animated.SharedValue<number>;
  activeTabY: Animated.SharedValue<number>;
}

type PanEventContext = {
  startX: number;
  startY: number;
};

const TabCardAnimated: React.FC<Props> = ({
  tab,
  index,
  switchToTabPosition,
  activeTabPosition,
  activeTabX,
  activeTabY,
}) => {
  const [isDraggingTab, setIsDragginTab] = useState<boolean>();
  const panRef = useRef();

  const translateX = tabPositions[index].x;
  const translateY = tabPositions[index].y;
  const safePosition = useSharedValue({
    x: translateX,
    y: translateY,
  });
  const translationsX = useSharedValue(translateX);
  const translationsY = useSharedValue(translateY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const setAnimDragTab = (shouldToggle: boolean): void => {
    const newScale = shouldToggle ? 0.8 : 1;
    const newOpacity = shouldToggle ? 0.7 : 1;
    scale.value = withTiming(newScale);
    opacity.value = withTiming(newOpacity);
    setIsDragginTab(shouldToggle);
  };

  const onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>): void => {
    const isLongPressing = nativeEvent.state === State.ACTIVE;
    const hasFinishedLongPressing = nativeEvent.state === State.END;
    const shouldToggleIsDraggin = isLongPressing && !isDraggingTab;

    if (shouldToggleIsDraggin) {
      setAnimDragTab(true);
    } else if (hasFinishedLongPressing) {
      setAnimDragTab(false);
    }
  };

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanEventContext
  >({
    onStart: (_, context) => {
      activeTabPosition.value = {
        x: translationsX.value,
        y: translationsY.value,
      };

      context.startX = translationsX.value;
      context.startY = translationsY.value;
    },
    onActive: (event, context) => {
      if (!isDraggingTab) {
        return;
      }

      const xPosition = context.startX + event.translationX;
      const yPosition = context.startY + event.translationY;

      translationsX.value = xPosition;
      translationsY.value = yPosition;

      const correctedYValue = event.absoluteY - ABSOLUTE_DRAG_DIFF;

      activeTabX.value = event.absoluteX;
      activeTabY.value = correctedYValue < 0 ? 0 : correctedYValue;
    },
    onEnd: () => {
      const shouldSwitch = !!switchToTabPosition.value;

      const switchToNewPosition = (): void => {
        const newXPosition = switchToTabPosition.value?.x || 0;
        const newYPosition = switchToTabPosition.value?.y || 0;

        safePosition.value.x = newXPosition;
        safePosition.value.y = newYPosition;

        translationsY.value = withTiming(newYPosition);
        translationsX.value = withTiming(newXPosition, undefined, () => {
          runOnJS(setIsDragginTab)(false);
        });
      };
      const animateToOldPosition = (): void => {
        translationsX.value = withTiming(translateX, undefined, () => {
          runOnJS(setIsDragginTab)(false);
        });
        translationsY.value = withTiming(translateY);
      };

      if (shouldSwitch) {
        switchToNewPosition();
      } else {
        animateToOldPosition();
      }

      scale.value = withTiming(1);
      opacity.value = withTiming(1);
      switchToTabPosition.value = null;
      activeTabPosition.value = null;
      activeTabX.value = -1;
      activeTabY.value = -1;
    },
  });

  const translateAnimationStyle = useAnimatedStyle(() => {
    const isNearStartOfTabX = activeTabX.value >= translationsX.value;
    const isBeforeEndOfTabX =
      activeTabX.value <= translationsX.value + TAB_SIZE.WIDTH;

    const isInSwitchAreaX = isNearStartOfTabX && isBeforeEndOfTabX;

    const isNearStartOfTabY =
      activeTabY.value > translationsY.value - DRAG_ACTIVE_AREA.TOP_Y;
    const isBeforeEndOfTabY =
      activeTabY.value <=
      translationsY.value + TAB_SIZE.HEIGHT - DRAG_ACTIVE_AREA.BOTTOM_Y;

    const isInSwitchAreaY = isNearStartOfTabY && isBeforeEndOfTabY;

    const hasActiveDragTab = !!activeTabPosition.value;

    const shouldSwitch =
      isInSwitchAreaX && isInSwitchAreaY && hasActiveDragTab && !isDraggingTab;

    if (isDraggingTab) {
      return {
        transform: [
          {
            translateX: translationsX.value,
          },
          {
            translateY: translationsY.value,
          },
          {
            scale: scale.value,
          },
        ],
        opacity: opacity.value,
      };
    }

    if (shouldSwitch) {
      switchToTabPosition.value = {
        x: translationsX.value,
        y: translationsY.value,
      };

      const previousX = translationsX.value;
      const previousY = translationsY.value;

      const newX = activeTabPosition.value?.x || 0;
      const newY = activeTabPosition.value?.y || 0;

      translationsX.value = newX;
      translationsY.value = newY;

      activeTabPosition.value = {
        x: previousX,
        y: previousY,
      };
    }

    return {
      transform: [
        {
          translateX: withTiming(translationsX.value),
        },
        {
          translateY: withTiming(translationsY.value),
        },
        {
          scale: scale.value,
        },
      ],
      opacity: opacity.value,
    };
  }, [isDraggingTab]);

  const tabElevation = useAnimatedStyle(() => {
    return isDraggingTab ? { zIndex: 10 } : { zIndex: 1 };
  }, [isDraggingTab]);

  const shadowStyle = isDraggingTab && Styles.aboveTabCardZIndex;

  return (
    <Animated.View style={tabElevation}>
      <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        simultaneousHandlers={[panRef]}>
        <Animated.View
          style={[
            Styles.tabsColumn,
            Styles.animatedTabCard,
            translateAnimationStyle,
            shadowStyle,
          ]}>
          <PanGestureHandler ref={panRef} onGestureEvent={panGestureHandler}>
            <Animated.View>
              <TabCard title={tab.title} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </LongPressGestureHandler>
    </Animated.View>
  );
};

export default TabCardAnimated;

import React, { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import {
  GestureEvent,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';

import Tab from '@screens/ChromeTabs/modules/interfaces/Tab';
import tabPositions from '@screens/ChromeTabs/modules/mocks/tabPositions';

import TabCard from './TabCard.native';
import Styles from './TabCard.styles';

interface Props {
  tab: Tab;
  index: number;
}

const TabCardAnimated: React.FC<Props> = ({ tab, index }) => {
  const [isActiveTab, setIsActiveTab] = useState<boolean>();
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const panRef = useRef();

  const isFirstCol = index % 2 === 0;
  const isDraggingTab = isActiveTab;

  const spacings = isFirstCol
    ? Styles.tabSpacingFirstCol
    : Styles.tabSpacingSecondCol;

  const onGestureEvent: (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => void = ({ nativeEvent }): void => {
    x.setValue(nativeEvent.translationX);
    y.setValue(nativeEvent.translationY);
  };

  const onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>): void => {
    const hasDragStarted = nativeEvent.state === State.ACTIVE;
    const hasDragEnded = nativeEvent.state === State.END;

    if (hasDragStarted && !isActiveTab) {
      setIsActiveTab(true);
    }

    if (hasDragEnded) {
      setIsActiveTab(false);
      x.setValue(0);
      y.setValue(0);
    }
  };

  let translateX = tabPositions[index].x;
  let translateY = tabPositions[index].y;

  if (isDraggingTab) {
    translateX = Animated.add(translateX, x) as Animated.Value;
    translateY = Animated.add(translateY, y) as Animated.Value;
  }

  const tabElevation = isDraggingTab
    ? Styles.aboveTabCardZIndex
    : Styles.underTabCardZIndex;

  const translateAnimationStyle = {
    transform: [
      {
        translateX,
      },
      {
        translateY,
      },
    ],
  };

  return (
    <View style={tabElevation}>
      <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        simultaneousHandlers={[panRef]}>
        <Animated.View
          style={[
            Styles.tabsColumn,
            Styles.animatedTabCard,
            translateAnimationStyle,
          ]}>
          <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent}>
            <Animated.View>
              <TabCard title={tab.title} style={spacings} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </LongPressGestureHandler>
    </View>
  );
};

export default TabCardAnimated;

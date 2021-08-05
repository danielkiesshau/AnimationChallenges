import React, { ReactElement } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import cards from '@screens/ScrollingAnimation/modules/mocks/cards';
import Card from '@screens/ScrollingAnimation/modules/interfaces/Card';
import CardItem from '@screens/ScrollingAnimation/CardItem/CardItem.animated';

import Styles from './ScrollingAnimation.styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ScrollingAnimationNative: React.FC<{}> = () => {
  const scroll = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scroll.value = contentOffset.y;
    },
  });

  const renderItem: ListRenderItem<Card> = ({ item, index }): ReactElement => {
    return <CardItem card={item} index={index} scroll={scroll} />;
  };

  return (
    <AnimatedFlatList
      data={cards}
      renderItem={renderItem as ListRenderItem<unknown>}
      scrollEventThrottle={16}
      contentContainerStyle={Styles.listContent}
      onScroll={scrollHandler}
    />
  );
};

export default ScrollingAnimationNative;

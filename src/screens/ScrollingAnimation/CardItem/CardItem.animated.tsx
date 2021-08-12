import React from 'react';
import { Dimensions, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { minClamp, maxClamp } from '@modules/helpers/animationHelpers';
import Card from '@screens/ScrollingAnimation/modules/interfaces/Card';
import CardNative from '@screens/ScrollingAnimation/Card/Card.native';

import Styles from './CardItem.styles';

const { height: wHeight } = Dimensions.get('window');

interface Props {
  index: number;
  card: Card;
  scroll: Animated.SharedValue<number>;
}

const CardItem: React.FC<Props> = ({ index, card, scroll }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const CARD_SIZE = 219;

    const position = minClamp(
      interpolate(
        scroll.value,
        [0, 0.0001 + index * CARD_SIZE],
        [0, -index * CARD_SIZE],
      ),
      -index * CARD_SIZE,
    );

    const translateY = scroll.value + position;

    const isDisappearing = -CARD_SIZE;
    const isBottom = wHeight - CARD_SIZE;
    const isAppearing = wHeight;
    const isTop = 0;

    const anims = index * CARD_SIZE - scroll.value;

    const scale = maxClamp(
      interpolate(
        anims,
        [isDisappearing, isTop, isBottom, isAppearing],
        [0.5, 1, 1, 0.5],
      ),
      1,
    );

    const opacity = interpolate(
      anims,
      [isDisappearing, isTop, isBottom, isAppearing],
      [0.5, 1, 1, 0.5],
    );

    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
      opacity,
    };
  });

  const composedStyle = [Styles.container];

  return (
    <Animated.View style={animatedStyle}>
      <CardNative style={composedStyle} image={card.image} />
    </Animated.View>
  );
};

export default CardItem;

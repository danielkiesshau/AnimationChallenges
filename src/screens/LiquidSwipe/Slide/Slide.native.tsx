import React from 'react';
import { View, Text, Image, StyleProp, ViewStyle } from 'react-native';

import Slide from '@screens/LiquidSwipe/modules/interfaces/Slide';

import Styles from './Slide.styles';

interface Props {
  slide: Slide;
  style?: StyleProp<ViewStyle>;
}

const SlideNative: React.FC<Props> = ({ slide, style }) => {
  return (
    <View style={[Styles.container, { backgroundColor: slide.color }, style]}>
      <Image style={Styles.image} source={slide.picture} />
      <Text style={Styles.title}>{slide.title}</Text>
      <Text style={Styles.description}>{slide.description}</Text>
    </View>
  );
};

export default SlideNative;

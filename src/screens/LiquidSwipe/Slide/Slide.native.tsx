import React from 'react';
import { View, Text, Image } from 'react-native';

import Slide from '@screens/LiquidSwipe/modules/interfaces/Slide';

import Styles from './Slide.styles';

interface Props {
  slide: Slide;
}

const SlideNative: React.FC<Props> = ({ slide }) => {
  return (
    <View style={[Styles.container, { backgroundColor: slide.color }]}>
      <Text style={Styles.title}>{slide.title}</Text>
      <Image style={Styles.image} source={slide.picture} />
      <Text style={Styles.description}>{slide.description}</Text>
    </View>
  );
};

export default SlideNative;

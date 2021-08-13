import React from 'react';
import { View } from 'react-native';

import slides from '@screens/LiquidSwipe/modules/mocks/slides';

import SlideNative from './Slide/Slide.native';
import Styles from './Slide/Slide.styles';

const LiquidSwipe: React.FC<{}> = () => {
  return (
    <View style={Styles.container}>
      <SlideNative slide={slides[0]} />
    </View>
  );
};

export default LiquidSwipe;

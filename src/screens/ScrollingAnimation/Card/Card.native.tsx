import React from 'react';
import {
  View,
  StyleProp,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import Styles from './Card.styles';

interface Props {
  style?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
}

const CardNative: React.FC<Props> = ({ style, image }) => {
  return (
    <View style={Styles.shadow}>
      <Image source={image} resizeMode="contain" style={[Styles.card, style]} />
    </View>
  );
};

export default CardNative;

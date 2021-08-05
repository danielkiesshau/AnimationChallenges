import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Styles from './Card.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const CardNative: React.FC<Props> = ({ style }) => {
  return <View style={[Styles.container, style]} />;
};

export default CardNative;

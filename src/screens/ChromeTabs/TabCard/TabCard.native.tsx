import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import CloseIcon from '@icons/close_icon.svg';
import COLORS from '@theme/COLORS.enum';

import Styles from './TabCard.styles';

interface TabCardProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const TabCard: React.FC<TabCardProps> = ({ title, style }) => {
  return (
    <View style={[Styles.container, style]}>
      <View style={Styles.header}>
        <Text style={Styles.title}>{title}</Text>
        <CloseIcon height={24} width={24} stroke={COLORS.WHITE_1} />
      </View>
    </View>
  );
};

export default TabCard;

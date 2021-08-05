import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import ChallengeCardNative from '@components/ChallengeCard/ChallengeCard.native';
import { RootStackParams } from '@routes/MainStack';
import MainStackScreens from '@routes/MainStackScreens.enum';

import Styles from './SharedElement.styles';
type SharedElementRouteProp = RouteProp<
  RootStackParams,
  MainStackScreens.SHARED_ELEMENT
>;

type Props = {
  route: SharedElementRouteProp;
};

const SharedElementNative: React.FC<Props> = ({ route }) => {
  const { animationChallenge } = route.params;

  return (
    <View style={Styles.container}>
      <ChallengeCardNative
        challenge={animationChallenge}
        icon={animationChallenge.icon}
      />
    </View>
  );
};

export default SharedElementNative;

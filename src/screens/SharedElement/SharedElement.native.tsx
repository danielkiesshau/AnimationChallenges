import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
// TODO: FIX IMPORT
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';

import { RootStackParams } from '@routes/MainStack';
import MainStackScreens from '@routes/MainStackScreens.enum';
import ChallengeCardNative from '@components/ChallengeCard/ChallengeCard.native';

import Styles from './SharedElement.styles';

type SharedElementRouteProp = RouteProp<
  RootStackParams,
  MainStackScreens.SHARED_ELEMENT
>;

export type SharedElementSceneProps = {
  navigation: StackNavigationProp<
    RootStackParams[MainStackScreens.SHARED_ELEMENT]
  >;
  route: SharedElementRouteProp;
};

const SharedElementNative: React.FC<SharedElementSceneProps> = ({ route }) => {
  const { animationChallenge } = route.params;

  return (
    <View style={Styles.container}>
      <SharedElement id={animationChallenge.id}>
        <ChallengeCardNative
          challenge={animationChallenge}
          icon={animationChallenge?.icon}
        />
      </SharedElement>
    </View>
  );
};

export default SharedElementNative;

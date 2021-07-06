import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import animationChallenges from '@mock/animationChallenges';
import MainStackScreens from '@routes/MainStackScreens.enum';
import ScreensInterfaces from '@routes/ScreensInterfaces';

import Styles from './Home.styles';

const HomeNative: React.FC<ScreensInterfaces> = ({ navigation }) => {
  const renderItem = useCallback(
    item => {
      const Icon = item.icon;

      const handleChallengePress = (): void => {
        navigation.push(MainStackScreens.CHROME_TABS, {});
      };

      return (
        <RectButton
          key={item.id}
          style={Styles.containerChallenge}
          onPress={handleChallengePress}>
          <Icon height={40} width={40} />
          <Text style={Styles.challengeLabel}>{item.label}</Text>
        </RectButton>
      );
    },
    [navigation],
  );

  const renderChallenges = useCallback(
    () => animationChallenges.map(renderItem),
    [renderItem],
  );

  const challenges = renderChallenges();

  return <View style={Styles.containerPage}>{challenges}</View>;
};

export default HomeNative;

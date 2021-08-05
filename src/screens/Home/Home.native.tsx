import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import animationChallenges from '@mocks/animationChallenges';
import ScreensInterfaces from '@routes/ScreensInterfaces';

import Styles from './Home.styles';

const HomeNative: React.FC<ScreensInterfaces> = ({ navigation }) => {
  const renderItem = useCallback(
    item => {
      const Icon = item.icon;

      const handleChallengePress = (): void => {
        navigation.push(item.route, {});
      };

      const IconContainer = Icon && <Icon height={40} width={40} />;

      return (
        <RectButton
          key={item.id}
          style={Styles.containerChallenge}
          onPress={handleChallengePress}>
          {IconContainer}
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

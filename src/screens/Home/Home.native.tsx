import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import animationChallenges from '@mock/animationChallenges';

import Styles from './Home.styles';

const HomeNative = () => {
  const renderItem = useCallback(item => {
    const Icon = item.icon;

    const handleChallengePress = () => {
      // TODO: implement navigation to animation challenge
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
  }, []);

  const renderChallenges = useCallback(
    () => animationChallenges.map(renderItem),
    [renderItem],
  );

  const challenges = renderChallenges();

  return <View style={Styles.containerPage}>{challenges}</View>;
};

export default HomeNative;

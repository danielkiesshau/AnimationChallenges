import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { AnimationChallenge } from '@modules/mocks/animationChallenges';

import Styles from './ChallengeCard.styles';

interface Props {
  challenge: AnimationChallenge;
  icon: ReactElement;
  handleChallengePress: () => void;
}

const ChallengeCardNative: React.FC<Props> = ({
  challenge,
  handleChallengePress,
  icon,
}) => {
  return (
    <RectButton
      key={challenge.id}
      style={Styles.containerChallenge}
      onPress={handleChallengePress}>
      {icon}
      <Text style={Styles.challengeLabel}>{challenge.label}</Text>
    </RectButton>
  );
};

export default ChallengeCardNative;

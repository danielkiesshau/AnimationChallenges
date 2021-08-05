import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { AnimationChallenge } from '@modules/mocks/animationChallenges';

import Styles from './ChallengeCard.styles';

interface Props {
  challenge: AnimationChallenge;
  icon?: FC<SvgProps>;
  handleChallengePress?: () => void;
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

ChallengeCardNative.defaultProps = {
  handleChallengePress: (): null => null,
};
export default ChallengeCardNative;

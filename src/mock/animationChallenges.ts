import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import ChromeIcon from '@icons/chrome_icon.svg';
import MainStackScreens from '@routes/MainStackScreens.enum';

const animationChallenges: AnimationChallenge[] = [
  {
    id: 'chrome',
    label: 'Chrome Tabs',
    icon: ChromeIcon,
    route: MainStackScreens.HOME,
  },
];

export interface AnimationChallenge {
  id: string;
  label: string;
  icon: FC<SvgProps>;
  route: string;
}

export default animationChallenges;

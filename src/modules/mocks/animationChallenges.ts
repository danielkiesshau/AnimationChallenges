import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import ChromeIcon from '@icons/chrome_icon.svg';
import MainStackScreens from '@routes/MainStackScreens.enum';

const animationChallenges: AnimationChallenge[] = [
  {
    id: 'chrome',
    label: 'Chrome Tabs',
    icon: ChromeIcon,
    route: MainStackScreens.CHROME_TABS,
  },
  {
    id: 'scrolling_animation',
    label: 'Scrolling Animation',
    route: MainStackScreens.SCROLLING_ANIMATION,
  },
  {
    id: 'shared_element',
    label: 'Shared Element',
    route: MainStackScreens.SHARED_ELEMENT,
  },
  {
    id: 'sticky_square',
    label: 'Sticky Square',
    route: MainStackScreens.STICKY_SQUARE,
  },
  {
    id: 'lidquid_swipe',
    label: 'Liquid Swipe',
    route: MainStackScreens.LIQUID_SWIPE,
  },
  {
    id: null,
  },
];

export interface AnimationChallenge {
  id: string;
  label: string;
  icon?: FC<SvgProps>;
  route: string;
}

export default animationChallenges;

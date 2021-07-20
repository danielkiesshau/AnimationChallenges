import { Animated } from 'react-native';

import TAB_SIZE from '@screens/ChromeTabs/modules/enums/Tab';

import tabs from './tabs';

const SPACINGS = {
  VERTICAL: 20,
  HORIZONTAL: 65,
};

const tabPositions = tabs.map((tab, index) => {
  const isFirstCol = index % 2 === 0;
  const isFirstRow = index <= 1;
  const row = Math.floor(index / 2);

  const tabX = isFirstCol ? 0 : TAB_SIZE.WIDTH + SPACINGS.VERTICAL;
  const tabY = isFirstRow ? 0 : TAB_SIZE.WIDTH * row + SPACINGS.HORIZONTAL;

  const animatedX = new Animated.Value(tabX);
  const animatedY = new Animated.Value(tabY);

  return {
    x: animatedX,
    y: animatedY,
  };
});

export default tabPositions;

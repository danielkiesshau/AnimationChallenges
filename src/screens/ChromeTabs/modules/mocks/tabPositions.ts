import TAB_SIZE from '@screens/ChromeTabs/modules/enums/Tab';

import tabs from './tabs';

const SPACINGS = {
  VERTICAL: 13,
  HORIZONTAL: 25,
};

const tabPositions = tabs.map((tab, index) => {
  const isFirstCol = index % 2 === 0;
  const isFirstRow = index <= 1;
  const row = Math.floor(index / 2);

  const tabX = isFirstCol ? 0 : TAB_SIZE.WIDTH + SPACINGS.HORIZONTAL;
  const tabY = isFirstRow ? 0 : TAB_SIZE.HEIGHT * row + SPACINGS.VERTICAL;

  return {
    x: tabX,
    y: tabY,
  };
});

export default tabPositions;

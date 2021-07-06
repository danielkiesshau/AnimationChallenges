import React, { useCallback } from 'react';
import { ListRenderItem } from 'react-native';

import tabs from '@screens/ChromeTabs/modules/mocks/tabs';

import ChromeTabsNative from './ChromeTabs.native';
import Styles from './ChromeTabs.styles';
import TabCard from './TabCard/TabCard.native';
import Tab from './modules/interfaces/Tab';

const ChromeTabsContainer: React.FC<{}> = () => {
  const renderTab: ListRenderItem<Tab> = useCallback(({ item, index }) => {
    const isFirstCol = index % 2 === 0;

    const spacings = isFirstCol
      ? Styles.tabSpacingFirstCol
      : Styles.tabSpacingSecondCol;

    return <TabCard title={item.title} style={spacings} />;
  }, []);

  const keyExtractor = (item: Tab): string => item.title;

  return (
    <ChromeTabsNative
      tabs={tabs}
      renderTab={renderTab}
      keyExtractor={keyExtractor}
    />
  );
};

export default ChromeTabsContainer;

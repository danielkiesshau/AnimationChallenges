import React, { ReactElement, useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSharedValue } from 'react-native-reanimated';

import StatusBarStyle from '@modules/enums/StatusBarStyles';
import tabs from '@screens/ChromeTabs/modules/mocks/tabs';
import TabOffset from '@screens/ChromeTabs/modules/interfaces/TabOffset';
import Tab from '@screens/ChromeTabs/modules/interfaces/Tab';

import ChromeTabsNative from './ChromeTabs.native';
import TabCardAnimated from './TabCard/TabCard.animated';

const ChromeTabsContainer: React.FC<StackScreenProps<{}>> = ({
  navigation,
}) => {
  const switchToTabPosition = useSharedValue<TabOffset | null>(null);
  const activeTabPosition = useSharedValue<TabOffset | null>(null);
  const activeTabX = useSharedValue<number>(-1);
  const activeTabY = useSharedValue<number>(-1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderTab = (tab: Tab, index: number): ReactElement => {
    return (
      <TabCardAnimated
        activeTabPosition={activeTabPosition}
        switchToTabPosition={switchToTabPosition}
        activeTabX={activeTabX}
        activeTabY={activeTabY}
        key={tab.title}
        tab={tab}
        index={index}
      />
    );
  };

  return (
    <>
      <StatusBar barStyle={StatusBarStyle.LIGHT} />
      <ChromeTabsNative tabs={tabs} renderTab={renderTab} />
    </>
  );
};

export default ChromeTabsContainer;

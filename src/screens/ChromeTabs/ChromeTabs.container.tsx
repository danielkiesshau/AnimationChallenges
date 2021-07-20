import React, { ReactElement, useLayoutEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import StatusBarStyle from '@modules/enums/StatusBarStyles';
import tabs from '@screens/ChromeTabs/modules/mocks/tabs';
import Tab from '@screens/ChromeTabs/modules/interfaces/Tab';

import ChromeTabsNative from './ChromeTabs.native';
import TabCardAnimated from './TabCard/TabCard.animated';
import { StatusBar } from 'react-native';

const ChromeTabsContainer: React.FC<StackScreenProps<{}>> = ({
  navigation,
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderTab = (tab: Tab, index: number): ReactElement => {
    return <TabCardAnimated key={tab.title} tab={tab} index={index} />;
  };

  return (
    <>
      <StatusBar barStyle={StatusBarStyle.LIGHT} />
      <ChromeTabsNative tabs={tabs} renderTab={renderTab} />
    </>
  );
};

export default ChromeTabsContainer;

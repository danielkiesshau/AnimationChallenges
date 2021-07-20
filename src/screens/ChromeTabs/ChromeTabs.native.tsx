import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Plus from '@icons/plus.svg';
import MoreVertical from '@icons/more_vertical.svg';
import { CHROME_COLORS } from '@theme/COLORS.enum';
import Tab from '@screens/ChromeTabs/modules/interfaces/Tab';

import Styles from './ChromeTabs.styles';

const Header: React.FC<{}> = () => {
  return (
    <View style={Styles.header}>
      <Plus stroke={CHROME_COLORS.LABELS} width={32} height={32} />
      <Text style={Styles.headerTitle}>New Tab</Text>
      <MoreVertical
        style={Styles.verticalDotsIcon}
        stroke={CHROME_COLORS.LABELS}
        width={32}
        height={32}
      />
    </View>
  );
};

export interface ChromeTabsNativeProps {
  tabs: Tab[];
  renderTab: (item: Tab, index: number) => ReactElement;
}

const ChromeTabsNative: React.FC<ChromeTabsNativeProps> = ({
  tabs,
  renderTab,
}) => {
  const listTabs = tabs.map((item, index) => renderTab(item, index));

  return (
    <SafeAreaView style={Styles.containerPage}>
      <Header />
      <View style={Styles.content}>{listTabs}</View>
    </SafeAreaView>
  );
};

export default ChromeTabsNative;

import React from 'react';
import { ListRenderItem, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
  renderTab: ListRenderItem<Tab>;
  keyExtractor: (item: Tab, index: number) => string;
}

const ChromeTabsNative: React.FC<ChromeTabsNativeProps> = ({
  tabs,
  renderTab,
  keyExtractor,
}) => {
  return (
    <SafeAreaView style={Styles.containerPage}>
      <Header />
      <FlatList
        data={tabs}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={renderTab}
        style={Styles.content}
      />
    </SafeAreaView>
  );
};

export default ChromeTabsNative;

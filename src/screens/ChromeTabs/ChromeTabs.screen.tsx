import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';

import ChromeTabsContainer from './ChromeTabs.container';

const ChromeTabsScreen: React.FC<StackScreenProps<{}>> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return <ChromeTabsContainer />;
};

export default ChromeTabsScreen;

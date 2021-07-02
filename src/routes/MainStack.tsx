import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/Home/Home.screen';
import ChromeTabsScreen from '@screens/ChromeTabs/ChromeTabs.screen';

import MainStackScreens from './MainStackScreens.enum';

const Stack = createStackNavigator();

const MainStackNavigator = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MainStackScreens.HOME} component={HomeScreen} />
      <Stack.Screen
        name={MainStackScreens.CHROME_TABS}
        component={ChromeTabsScreen}
      />
    </Stack.Navigator>
  );
});

export default MainStackNavigator;

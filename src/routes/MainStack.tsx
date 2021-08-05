import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/Home/Home.container';
import ChromeTabsScreen from '@screens/ChromeTabs/ChromeTabs.container';
import ScrollingAnimationScreen from '@screens/ScrollingAnimation/ScrollingAnimation.container';

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
      <Stack.Screen
        name={MainStackScreens.SCROLLING_ANIMATION}
        component={ScrollingAnimationScreen}
      />
    </Stack.Navigator>
  );
});

export default MainStackNavigator;

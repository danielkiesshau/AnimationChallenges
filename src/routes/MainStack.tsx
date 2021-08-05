import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/Home/Home.container';
import ChromeTabsScreen from '@screens/ChromeTabs/ChromeTabs.container';
import ScrollingAnimationScreen from '@screens/ScrollingAnimation/ScrollingAnimation.container';
import SharedElementNative from '@screens/SharedElement/SharedElement.native';
import SharedElementNavigationParams from '@screens/SharedElement/modules/interfaces/SharedElementNavigationParams';

import MainStackScreens from './MainStackScreens.enum';

export type RootStackParams = {
  [MainStackScreens.HOME]: undefined;
  [MainStackScreens.CHROME_TABS]: undefined;
  [MainStackScreens.SCROLLING_ANIMATION]: undefined;
  [MainStackScreens.SHARED_ELEMENT]: SharedElementNavigationParams;
};

const Stack = createStackNavigator<RootStackParams>();

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
      <Stack.Screen
        name={MainStackScreens.SHARED_ELEMENT}
        component={SharedElementNative}
      />
    </Stack.Navigator>
  );
});

export default MainStackNavigator;

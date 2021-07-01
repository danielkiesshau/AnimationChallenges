import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeContainer from '@screens/Home/Home.screen';

import MainStackScreens from './MainStackScreens.enum';

const Stack = createStackNavigator();

const MainStackNavigator = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MainStackScreens.HOME} component={HomeContainer} />
    </Stack.Navigator>
  );
});

export default MainStackNavigator;

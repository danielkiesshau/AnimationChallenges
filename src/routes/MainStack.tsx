import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainStackScreens from './MainStackScreens.enum';
import HomeContainer from '../scenes/Home/Home.container';

const Stack = createStackNavigator();

const MainStackNavigator = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MainStackScreens.HOME} component={HomeContainer} />
    </Stack.Navigator>
  );
});

export default MainStackNavigator;

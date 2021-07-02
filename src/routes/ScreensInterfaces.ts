import { StackNavigationProp } from '@react-navigation/stack';

import MainStackScreens from './MainStackScreens.enum';

export default interface ScreensInterfaces {
  navigation: StackNavigationProp<{
    [MainStackScreens.CHROME_TABS]: {};
  }>;
};

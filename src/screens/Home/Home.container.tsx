import React, { useLayoutEffect } from 'react';

import COLORS from '@theme/COLORS.enum';
import ScreensInterfaces from '@routes/ScreensInterfaces';

import HomeNative from './Home.native';
import Labels from './Labels';

const HomeScreenContainer: React.FC<ScreensInterfaces> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: Labels.HEADER_TITLE,
      headerStyle: {
        backgroundColor: COLORS.WHITE_1,
      },
    });
  }, [navigation]);

  return <HomeNative navigation={navigation} />;
};

export default HomeScreenContainer;

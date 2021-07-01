import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import COLORS from '@theme/COLORS.enum';

import HomeNative from './Home.native';
import Labels from './Labels';

const HomeContainer: React.FC<StackScreenProps<{}>> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: Labels.HEADER_TITLE,
      headerStyle: {
        backgroundColor: COLORS.WHITE_1,
      },
    });
  }, [navigation]);

  return <HomeNative />;
};

export default HomeContainer;

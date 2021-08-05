import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import animationChallenges from '@mocks/animationChallenges';
import ScreensInterfaces from '@routes/ScreensInterfaces';
import ChallengeCardNative from '@components/ChallengeCard/ChallengeCard.native';

import Styles from './Home.styles';

const HomeNative: React.FC<ScreensInterfaces> = ({ navigation }) => {
  const renderItem = useCallback(
    ({ item }) => {
      const Icon = item.icon;

      const handleChallengePress = (): void => {
        navigation.push(item.route, {
          animationChallenge: item,
        });
      };

      const IconContainer = Icon && <Icon height={40} width={40} />;

      return (
        <ChallengeCardNative
          key={item.id}
          challenge={item}
          icon={IconContainer}
          handleChallengePress={handleChallengePress}
        />
      );
    },
    [navigation],
  );

  return (
    <View style={Styles.containerPage}>
      <FlatList
        data={animationChallenges}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={Styles.columns}
      />
    </View>
  );
};

export default HomeNative;

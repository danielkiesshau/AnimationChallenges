import { StyleSheet } from 'react-native';

import COLORS from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  containerChallenge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 93,
    width: 116,
    backgroundColor: COLORS.WHITE_1,
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 24,
    elevation: 1,
    shadowColor: COLORS.GRAY_1,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  challengeLabel: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 8,
  },
});

export default Styles;

import { StyleSheet } from 'react-native';

import COLORS from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_2,
    paddingHorizontal: 24,
  },
  containerChallenge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
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
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 8,
  },
});

export default Styles;

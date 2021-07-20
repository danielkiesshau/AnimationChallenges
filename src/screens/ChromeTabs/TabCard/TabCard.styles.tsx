import { StyleSheet } from 'react-native';

import COLORS, { CHROME_COLORS } from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 220,
    backgroundColor: COLORS.WHITE_2,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: CHROME_COLORS.HEADER_TAB,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    color: CHROME_COLORS.LABELS,
    fontWeight: '600',
    fontSize: 16,
  },
  tabSpacingFirstCol: {
    marginRight: 20,
    marginBottom: 20,
  },
  tabSpacingSecondCol: {
    marginBottom: 20,
  },
  tabsColumn: {
    width: '50%',
  },
  aboveTabCardZIndex: {
    zIndex: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  underTabCardZIndex: {
    zIndex: 1,
  },
  animatedTabCard: {
    position: 'absolute',
  },
});

export default Styles;

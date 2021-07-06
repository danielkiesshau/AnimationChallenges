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
});

export default Styles;

import { StyleSheet } from 'react-native';

import COLORS from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_2,
  },
  columns: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

export default Styles;

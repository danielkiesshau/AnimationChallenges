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
  columns: {
    justifyContent: 'space-between',
  },
});

export default Styles;

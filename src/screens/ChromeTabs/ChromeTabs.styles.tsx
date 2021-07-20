import { StyleSheet } from 'react-native';

import { CHROME_COLORS } from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: CHROME_COLORS.BACKGROUND_PAGE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: CHROME_COLORS.LABELS,
    marginLeft: 16,
  },
  verticalDotsIcon: {
    alignSelf: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Styles;

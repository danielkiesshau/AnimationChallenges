import { StyleSheet } from 'react-native';
import { SCROLLING_ANIMATION } from '@theme/COLORS.enum';

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 250,
    width: '85%',
    borderRadius: 12,
    backgroundColor: SCROLLING_ANIMATION.DEFAULT_CARD_BACKGROUND,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Styles;

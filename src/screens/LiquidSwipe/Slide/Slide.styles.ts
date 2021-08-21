import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export const DEFAULT_PADDING = 75;

const SIZE = width - DEFAULT_PADDING;

const Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: DEFAULT_PADDING,
    paddingTop: 150,
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'SFProDisplay-Bold',
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'SFProDisplay-Regular',
  },
  leftWave: {
    zIndex: 2,
  },
});

export default Styles;

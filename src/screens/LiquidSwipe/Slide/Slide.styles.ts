import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const SIZE = width - 75;

const Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
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
});

export default Styles;

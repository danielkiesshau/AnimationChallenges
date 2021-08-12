import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    height: 199,
    width: '85%',
    borderRadius: 12,
  },
  shadow: {
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

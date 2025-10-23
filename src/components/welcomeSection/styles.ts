import { StyleSheet } from 'react-native';
import { FontSizes } from '../../constants/FontSizes';
import { Palette } from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    marginTop: 20,
  },
  welcome: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Palette.white,
    marginBottom: 8,
    textAlign:'center'
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Palette.lightGray,
    marginBottom: 20,
    textAlign:'center'
  },
});

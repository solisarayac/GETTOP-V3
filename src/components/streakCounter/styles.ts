import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  container: {
    paddingVertical: 0,
    width: 200,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:5
  },
  text: {
    color: Palette.black,
    fontSize: FontSizes.medium,
  },
  marcador: {
    color: Palette.secondary,
    fontWeight: 'bold',
  },
});

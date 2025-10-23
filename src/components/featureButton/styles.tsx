import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.darkGray,
    borderLeftWidth:4,
    borderLeftColor: Palette.third,
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    flex: 1,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
  },
  subtitle: {
    color: Palette.lightGray,
    fontSize: FontSizes.small,
    marginTop: 2,
  },
});
import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Palette.white,
  },
  menuItem: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor:Palette.mediumGray
  },
  menuIcon: {
    marginRight: 6,
  },
  menuText: {
    fontSize: FontSizes.medium,
    color: Palette.mediumGray,
    fontWeight: '600',
  },
  activeMenuItem: {
    borderBottomColor: Palette.third,
  },
});
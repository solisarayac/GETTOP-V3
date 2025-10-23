import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    alignItems:'center',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  noSaved: {
    color: Palette.lightGray,
    fontSize: FontSizes.medium,
    textAlign: 'center',
    marginTop: 30,
  },
  likesOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  likesText: {
    color: Palette.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

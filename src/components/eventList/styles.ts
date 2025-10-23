import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop:10
  },
  title: {
    color: Palette.white,
    fontSize: FontSizes.large,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    backgroundColor: Palette.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: { flex: 1 },
  eventName: {
    color: Palette.black,
    fontWeight: '600',
    marginRight:5,
    fontSize: FontSizes.medium,
  },
  eventDate: {
    color: Palette.third,
    fontSize: FontSizes.small,
  },
  eventLocation: {
    color: Palette.gray,
    fontSize: FontSizes.small,
  },
  button: {
    backgroundColor: Palette.third,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: Palette.white,
    fontWeight: '700',
  },
});
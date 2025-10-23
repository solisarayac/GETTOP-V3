import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

export default StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: Palette.white,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderColor: Palette.secondary,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: Palette.lightGray,
    shadowColor: Palette.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  username: {
    color: Palette.secondary,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: Palette.secondary,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Palette.black,
    fontSize: FontSizes.small,
  },
  separatorLeft: {
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#f3f3f3ff',
  },
  separatorBottom: {
    width: '40%',
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: '#f3f3f3ff',
  },
  topRow: {
    position:'absolute',
    right:15.,
    top:10
  },
});

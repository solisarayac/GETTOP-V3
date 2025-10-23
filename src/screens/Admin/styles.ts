import { StyleSheet, Dimensions } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  adminContainer: {
    flex: 1,
    backgroundColor: Palette.white,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f3f3f3ff'
  },
  adminTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Palette.third || Palette.mediumGray,
    textAlign: 'center',
    marginBottom: 16,
  },

  adminCard: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  adminThumbnail: {
    width: width * 0.35,
    height: width * 0.35 * 0.6,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },

  adminInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  adminText: {
    fontSize: FontSizes.small,
    color: Palette.black,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  adminBand:{
    fontWeight:'400',
    color: Palette.gray
  },
  approveButton: {
    marginTop: 6,
    backgroundColor: Palette.third || Palette.darkGray,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },

  approveText: {
    color: Palette.white,
    fontSize: FontSizes.small,
    fontWeight: 'bold',
  },

  adminEmpty: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
});

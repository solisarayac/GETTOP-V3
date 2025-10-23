import { StyleSheet, Dimensions } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 53;

export default StyleSheet.create({
  videoContainer: {
    width,
    height: height - TAB_BAR_HEIGHT,
    backgroundColor: Palette.black,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  overlay: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    alignItems: 'center',
  },
  button: {
    marginBottom: 0,
  },
  actionText: {
    color: '#fff',
    fontSize: FontSizes.medium,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
    width: 50,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Palette.white,
  },
  followButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Palette.third,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

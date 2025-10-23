import { StyleSheet, Dimensions } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.5,
    backgroundColor: Palette.darkGray,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Palette.white,
  },
  empty: {
    color: Palette.lightGray,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Palette.mediumGray,
    color: Palette.black,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: Palette.third,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginLeft: 8,
    borderRadius: 8,
  },
  containerComment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 8,
    maxWidth: '100%',
  },
  commentUser: {
    color: Palette.gray,
    fontSize: FontSizes.small,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  comment: {
    color: Palette.white,
    fontSize: FontSizes.small,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  imgContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.lightGray,
    borderRadius: '100%',
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
});

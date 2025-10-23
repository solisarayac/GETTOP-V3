import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Palette.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Palette.mediumGray,
    color: Palette.darkGray,
    fontSize: FontSizes.medium,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Palette.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    textAlign:'center',
    marginTop: 15,
  },
  text: {
    color: Palette.black,
  },
  linkText: {
    color: Palette.third,
  },
  errorText: {
    color: Palette.secondary,
    marginBottom: 10,
    marginTop: -20,
    fontSize: FontSizes.small,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default styles;

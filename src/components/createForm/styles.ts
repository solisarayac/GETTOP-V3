import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    justifyContent:'center',
    borderRadius:10,
    
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: Palette.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor:Palette.white,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: Palette.third,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Palette.white,
    fontWeight: '600',
    fontSize: 16,
  },
  mapsHint: {
    textAlign: 'center',
    color: Palette.third,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

export default styles;
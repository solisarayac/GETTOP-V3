import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';
import { FontSizes } from '../../constants/FontSizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.black,
  },
  subContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: FontSizes.h1,
    fontWeight: 'bold',
    color: Palette.white,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: Palette.third,
    alignSelf: 'flex-start',
  },
  highlightText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Palette.white,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Palette.white,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Palette.darkGray,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 5,
    alignItems: 'center',
  },
  logo: {
    backgroundColor: Palette.third,
    padding: 10,
    borderRadius: '100%',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 1,
    alignItems: 'center',
    backgroundColor: Palette.darkGray,
  },
  menuItem: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
  },
  menuIcon: {
    marginRight: 6,
  },
  menuText: {
    fontSize: FontSizes.medium,
    color: '#fff',
    fontWeight: '600',
  },
  activeMenuItem: {
    color: Palette.third,
    borderBottomColor: Palette.third,
  },
  buttonMap: {
    marginTop: 20,
    backgroundColor: Palette.third,
    padding:18,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'row',
    borderRadius: 8,
  },
  explorarText: {
    fontSize: FontSizes.medium,
    color: Palette.white,
    fontWeight: 'bold'
  },
  logoutButton: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;

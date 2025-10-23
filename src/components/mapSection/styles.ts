import { StyleSheet } from 'react-native';
import { FontSizes } from '../../constants/FontSizes';
import { Palette } from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: FontSizes.large,
    color: Palette.white,
    marginBottom: 16,
  },
  mapPlaceholder: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },

  mapText: {
    color: Palette.lightGray,
    fontSize: 14,
  },
  filters: {
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filtersContainer: {
    marginTop: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.darkGray,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: Palette.third,
  },
  icon: {
    marginRight: 6,
  },
  filterText: {
    color: Palette.white,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: Palette.white,
    fontWeight: 'bold',
  },
});

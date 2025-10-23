import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapAct from '../../assets/svg/mapAct.svg';
import MapBlack from '../../assets/svg/mapBlack.svg';
import FavoriteAct2 from '../../assets/svg/favoriteAct2.svg';
import FavoriteBlack from '../../assets/svg/favoriteBlack.svg';
import styles from './styles';
import { Palette } from '../../constants/Colors';

interface Props {
  activeTab: 'eventos' | 'guardados';
  setActiveTab: (tab: 'eventos' | 'guardados') => void;
  options: string;
}

const ProfileMenu: React.FC<Props> = ({ activeTab, setActiveTab, options }) => (
  <View style={styles.menu}>
    <TouchableOpacity
      style={[styles.menuItem, activeTab === 'eventos' && styles.activeMenuItem]}
      onPress={() => setActiveTab('eventos')}
    >
      {activeTab === 'eventos'
        ? <MapAct height={15} width={15} style={styles.menuIcon} />
        : <MapBlack height={15} width={15} style={styles.menuIcon} />
      }
      <Text
        style={[styles.menuText, activeTab === 'eventos' && { color: Palette.third }]}
      >
        Eventos
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.menuItem, activeTab === 'guardados' && styles.activeMenuItem]}
      onPress={() => setActiveTab('guardados')}
    >
      {activeTab === 'guardados'
        ? <FavoriteAct2 height={15} width={15} style={styles.menuIcon} />
        : <FavoriteBlack height={15} width={15} style={styles.menuIcon} />
      }
      <Text
        style={[styles.menuText, activeTab === 'guardados' && { color: Palette.third }]}
      >
        {options}
      </Text>
    </TouchableOpacity>
  </View>
);

export default ProfileMenu;
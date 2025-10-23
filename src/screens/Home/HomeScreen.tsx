import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';
import Location from '../../assets/svg/location.svg';
import Home from '../../assets/svg/home.svg';
import HomeAct from '../../assets/svg/homeAct.svg';
import MapaAct from '../../assets/svg/mapAct.svg';
import Mapa from '../../assets/svg/map.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette } from '../../constants/Colors';
import WelcomeSection from '../../components/welcomeSection/WelcomeSection';
import MapSection from '../../components/mapSection/MapSection';


const HomeScreen: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inicio' | 'mapa'>('inicio');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'futbol' | 'baloncesto' | 'voleibol'>('todos');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Location width={25} height={25} />
          </View>
          <View style={styles.logoRow}>
            <Text style={styles.title}>G</Text>
            <View style={styles.underline}>
              <Text style={styles.title}>ETTO</Text>
            </View>
            <Text style={styles.title}>P</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Encuentra canchas deportivas</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeTab === 'inicio' && styles.activeMenuItem,
          ]}
          onPress={() => setActiveTab('inicio')}
        >
          {activeTab === 'inicio' ?
            <HomeAct height={15} width={14} style={styles.menuIcon} /> :
            <Home height={15} width={14} style={styles.menuIcon} />
          }
          <Text
            style={[
              styles.menuText,
              activeTab === 'inicio' && { color: Palette.third },
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeTab === 'mapa' && styles.activeMenuItem,
          ]}
          onPress={() => setActiveTab('mapa')}
        >
          {activeTab === 'mapa' ?
            <MapaAct height={15} width={14} style={styles.menuIcon} /> :
            <Mapa height={15} width={14} style={styles.menuIcon} />
          }
          <Text style={[
            styles.menuText,
            activeTab === 'mapa' && { color: Palette.third },
          ]}
          >
            Mapa
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        {activeTab === 'inicio' && (
          <>
            <WelcomeSection
              onSelectFilter={(filter) => {
                setActiveFilter(filter);
                setActiveTab('mapa');
              }}
            />
            <TouchableOpacity onPress={ () => setActiveTab('mapa')} style={styles.buttonMap}>
              <Mapa height={15} width={14} style={styles.menuIcon} />
              <Text style={styles.explorarText}>Explorar mapa</Text>
            </TouchableOpacity>
          </>
        )}
        {activeTab === 'mapa' && (
          <MapSection
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
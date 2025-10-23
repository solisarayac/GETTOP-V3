import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Location from '../../assets/svg/location.svg';
import Futbol from '../../assets/svg/futbol.svg';
import Baloncesto from '../../assets/svg/baloncesto.svg';
import Voleibol from '../../assets/svg/voleibol.svg';
import styles from './styles';
import { FontSizes } from '../../constants/FontSizes';

interface MapSectionProps {
  activeFilter: Sport;
  setActiveFilter: (filter: Sport) => void;
}

// Tipos de filtros
type Sport = 'todos' | 'futbol' | 'baloncesto' | 'voleibol';

// Definimos los filtros
const filters = [
  { key: 'todos', label: 'Todos', icon: <Location width={18} height={18} /> },
  { key: 'futbol', label: 'Fútbol', icon: <Futbol width={18} height={18} /> },
  { key: 'baloncesto', label: 'Baloncesto', icon: <Baloncesto width={18} height={18} /> },
  { key: 'voleibol', label: 'Voleibol', icon: <Voleibol width={18} height={18} /> },
];

const places = [
  { id: 1, type: 'futbol', title: 'Cancha de Fútbol Escazú Centro', lat: 9.9195, lng: -84.1390 },
  { id: 2, type: 'baloncesto', title: 'Cancha de Baloncesto San Rafael', lat: 9.9250, lng: -84.1455 },
  { id: 3, type: 'voleibol', title: 'Cancha de Voleibol Escazú', lat: 9.9120, lng: -84.1320 },
  { id: 4, type: 'futbol', title: 'Cancha Futbol 5', lat: 9.9167, lng: -84.1333 },
  { id: 5, type: 'futbol', title: 'Cancha Fútbol San Rafael', lat: 9.9210, lng: -84.1360 },
  { id: 6, type: 'futbol', title: 'Cancha Fútbol Los Laureles', lat: 9.9185, lng: -84.1305 },
  { id: 7, type: 'baloncesto', title: 'Cancha Baloncesto Escazú Este', lat: 9.9220, lng: -84.1345 },
  { id: 8, type: 'baloncesto', title: 'Cancha Baloncesto San Antonio', lat: 9.9170, lng: -84.1380 },
  { id: 9, type: 'voleibol', title: 'Cancha Voleibol Bello Horizonte', lat: 9.9135, lng: -84.1310 },
  { id: 10, type: 'voleibol', title: 'Cancha Voleibol Escazú Oeste', lat: 9.9155, lng: -84.1375 },
];


const MapSection: React.FC<MapSectionProps> = ({ activeFilter, setActiveFilter }) => {
  const filteredPlaces =
    activeFilter === 'todos'
      ? places
      : places.filter((p) => p.type === activeFilter);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: FontSizes.medium }]}>
        Encuentra canchas cerca de tu ubicación
      </Text>

      {/* Contenedor del mapa con borde redondeado */}
      <View
        style={{
          width: '100%',
          height: 300,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 9.9167, // Escazú centro
            longitude: -84.1333,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          {/* Tile de OpenStreetMap */}
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.lat, longitude: place.lng }}
              title={place.title}
            />
          ))}
        </MapView>
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10 }}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[styles.filterButton, activeFilter === filter.key && styles.activeFilterButton]}
            onPress={() => setActiveFilter(filter.key as Sport)}
          >
            <View style={styles.icon}>{filter.icon}</View>
            <Text style={[styles.filterText, activeFilter === filter.key && styles.activeFilterText]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MapSection;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useEvents } from '../../context/EventContext';
import styles from './styles';

interface EventListProps {
  incrementStreak: () => void;
}

const EventList: React.FC<EventListProps> = ({ incrementStreak }) => {
  const { events } = useEvents();

  const openMap = (url: string) => {
    Linking.openURL(url);
    incrementStreak();
  };

  return (
    <View style={styles.container}>
      {events.length > 0 ? (
        <FlatList
          data={events}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openMap(item.mapsUrl)}
              >
                <Text style={styles.buttonText}>Ir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default EventList;
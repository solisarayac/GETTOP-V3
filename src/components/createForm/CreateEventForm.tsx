import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useEvents } from '../../context/EventContext';
import styles from './styles';
import { Palette } from '../../constants/Colors';

const CreateEventForm: React.FC = () => {
  const { addEvent } = useEvents();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');

  const handleSubmit = () => {
    if (!name || !date || !location || !mapsUrl) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos antes de continuar.');
      return;
    }

    addEvent({ name, date, location, mapsUrl });

    Alert.alert(
      'Evento creado',
      'El evento se ha creado exitosamente.',
      [{ text: 'OK', onPress: () => console.log('Evento guardado') }]
    );

    setName('');
    setDate('');
    setLocation('');
    setMapsUrl('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Ajusta si es necesario
    >
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.formTitle}>Crear nuevo evento</Text>

        <TextInput
          placeholder="Nombre del evento"
          placeholderTextColor={Palette.lightGray}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Fecha (ej. 16 Oct 2025, 5:00 PM)"
          value={date}
          placeholderTextColor={Palette.lightGray}
          onChangeText={setDate}
          style={styles.input}
        />

        <TextInput
          placeholder="Nombre del lugar"
          value={location}
          placeholderTextColor={Palette.lightGray}
          onChangeText={setLocation}
          style={styles.input}
        />

        <TextInput
          placeholder="URL de Google Maps"
          value={mapsUrl}
          placeholderTextColor={Palette.lightGray}
          onChangeText={setMapsUrl}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear evento</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps')}>
          <Text style={styles.mapsHint}>Abrir Google Maps</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEventForm;
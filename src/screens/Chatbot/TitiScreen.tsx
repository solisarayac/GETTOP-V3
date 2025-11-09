 // src/screens/Chatbot/TitiScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import SendIcon from '../../assets/svg/send.svg'; // tu SVG de enviar
import { Palette } from '../../constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'titi';
}

const TitiScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Respuesta simulada de Titi 🐒
    setTimeout(() => {
      const titiReply: Message = {
        id: (Date.now() + 1).toString(),
        text: generateTitiResponse(inputText),
        sender: 'titi',
      };
      setMessages(prev => [...prev, titiReply]);
    }, 800);
  };

  const generateTitiResponse = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('hola')) return '¡Holaaa bro! 🐒 ¿Cómo va todo?';
    if (lower.includes('ayuda')) return 'Claro bro, contame qué ocupás 👀';
    if (lower.includes('gracias')) return 'De nada bro, Titi siempre al tiro 🔥';
    return 'Hmm interesante... contame más 👀';
  };

  return (
    <LinearGradient colors={[Palette.secondary, Palette.thirdAux]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.header}>💬 Chat con Titi</Text>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'user' ? styles.userBubble : styles.titiBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribí algo..."
            placeholderTextColor={Palette.lightGray}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <SendIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default TitiScreen;

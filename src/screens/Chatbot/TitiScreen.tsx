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
import SendIcon from '../../assets/svg/send.svg';
import { Palette } from '../../constants/Colors';
import { sendMessageToTiti } from '../../services/TitiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'titi';
}

const TitiScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setLoading(true);

    try {
      const titiResponse = await sendMessageToTiti(inputText);

      const titiReply: Message = {
        id: (Date.now() + 1).toString(),
        text: titiResponse.answer,
        sender: 'titi',
      };

      setMessages(prev => [...prev, titiReply]);
    } catch (error) {
      console.error(error);
      const errorReply: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Oops, Titi está durmiendo 😴. Intentá de nuevo.',
        sender: 'titi',
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
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
            editable={!loading}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={loading}>
            <SendIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default TitiScreen;

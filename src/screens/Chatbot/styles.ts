// src/screens/Chatbot/styles.ts
import { StyleSheet } from 'react-native';
import { Palette } from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: Palette.white,
    marginBottom: 16,
    alignSelf: 'center',
  },
  messagesContainer: {
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  userBubble: {
    backgroundColor: Palette.third, // naranja
    alignSelf: 'flex-end',
  },
  titiBubble: {
    backgroundColor: Palette.secondary, // rojo
    alignSelf: 'flex-start',
  },
  messageText: {
    color: Palette.white,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Palette.white,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Palette.darkGray,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: Palette.thirdAux, // amarillo/naranja
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

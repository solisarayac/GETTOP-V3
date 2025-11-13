// src/services/TitiService.ts
import { Platform } from 'react-native';

interface TitiResponse {
  answer: string;
}

export const sendMessageToTiti = async (message: string): Promise<TitiResponse> => {
  try {
    // Cambiá este link por el de tu deploy en Vercel
    const CHATBOT_URL =
      'https://chatbot-api-2.vercel.app/chat';

    const response = await fetch(CHATBOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    const data = await response.json();
    return { answer: data.answer };
  } catch (error) {
    console.error('Error enviando mensaje a Titi:', error);
    return { answer: 'Oops, algo salió mal 😢. Intentá de nuevo.' };
  }
};  

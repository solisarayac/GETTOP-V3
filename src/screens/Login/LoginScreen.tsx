import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import GETTOP from '../../assets/svg/GETTOP.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { getUser } from '../../services/userServices';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { login } = useAuth();

  const handleLogin = async () => {
    // 1. Validar que los campos no estén vacíos
    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    // 2. Intentar encontrar el usuario
    const userFound = await getUser(email);

    // 3. Verificar las credenciales
    if (!userFound || userFound.password !== password) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    // 4. Si las credenciales son válidas, llamar a la función de login del AuthContext
    setError('');
    const success = await login(email, password);

    if (success) {
      console.log('Inicio de sesión exitoso');
    } else {
      setError('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <GETTOP width={200} height={50} style={styles.logo} />
          
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#DB5905', '#CC1713']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.textContainer}>
            <Text style={styles.text}>¿Aún no tienes cuenta?{" "}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
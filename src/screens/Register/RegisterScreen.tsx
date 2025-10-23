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
import LinearGradient from 'react-native-linear-gradient';
import GETTOP from '../../assets/svg/GETTOP.svg';
import styles from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const RegisterScreen: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [succesMessage, setSuccesMessage] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmError, setConfirmError] = useState<string>('');

  const { register } = useAuth();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);

    if (!hasUpperCase || !hasLowerCase) {
      setPasswordError('La contraseña debe contener mayúsculas y minúsculas.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    if (!user) { setUserError('El nombre de usuario es requerido.'); return; } else { setUserError(''); }
    if (!email) { setEmailError('El correo electrónico es requerido.'); return; } else { setEmailError(''); }
    
    if (password !== confirmPassword) { setConfirmError('Las contraseñas no coinciden.'); return; } else { setConfirmError(''); }

    if (!validatePassword(password)) { return; }

    const newUser = { user, email, password };
    const result = await register(newUser); // Llama a la función y obtiene el resultado

    if (result.success) {
      setSuccesMessage(result.message);
    } else {
      setEmailError(result.message);
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
            placeholder="Nombre de usuario"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            value={user}
            onChangeText={setUser}
          />
          {userError ? <Text style={styles.errorText}>{userError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}
          {succesMessage ? <Text style={styles.successText}>{succesMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <LinearGradient
              colors={['#DB5905', '#CC1713']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Registrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              ¿Ya tienes cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Inicia sésion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  user: string;
  email: string;
  password: string;
  avatar?: string;
};

const USER_STORAGE_KEY = 'allUsers';

// Obtiene todos los usuarios de AsyncStorage
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    console.log('Error al obtener todos los usuarios:', e);
    return [];
  }
};

// Guarda todos los usuarios en AsyncStorage
export const saveAllUsers = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.log('Error al guardar todos los usuarios:', e);
  }
};

// Obtiene un usuario por email
export const getUser = async (email: string): Promise<User | null> => {
  try {
    const allUsers = await getAllUsers();
    const foundUser = allUsers.find(u => u.email === email);
    return foundUser || null;
  } catch (e) {
    console.log('Error al obtener el usuario:', e);
    return null;
  }
};

// Configuración inicial: carga los usuarios predefinidos
export const setupPredefinedUsers = async (): Promise<void> => {
  const users = await getAllUsers();
  if (users.length === 0) {
    const predefinedUsers: User[] = [
      {
        user: 'Admin',
        email: 'admin@gettop.com',
        password: 'admin',
        avatar: '',
      },
      {
        user: 'Cliente',
        email: 'cliente@gettop.com',
        password: 'cliente',
        avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      },
    ];
    await saveAllUsers(predefinedUsers);
    console.log('Usuarios predefinidos creados.');
  }
};

// Guarda el usuario actual (para la sesión activa)
export const saveCurrentUser = async (
  email: string,
  role: string,
): Promise<void> => {
  try {
    const currentUser = JSON.stringify({ email, role });
    await AsyncStorage.setItem('currentUser', currentUser);
  } catch (e) {
    console.log('Error al guardar el usuario actual:', e);
  }
};

// Obtiene el usuario actual de la sesión
export const getCurrentUser = async (): Promise<{
  email: string;
  role: string;
} | null> => {
  try {
    const currentUser = await AsyncStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (e) {
    console.log('Error al obtener el usuario actual:', e);
    return null;
  }
};

// Elimina el usuario actual de la sesión
export const removeCurrentUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('currentUser');
  } catch (e) {
    console.log('Error al eliminar el usuario actual:', e);
  }
};
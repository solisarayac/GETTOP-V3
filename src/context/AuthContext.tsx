import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  saveCurrentUser,
  getCurrentUser,
  removeCurrentUser,
  getAllUsers,
  saveAllUsers,
  setupPredefinedUsers,
  User
} from './../services/userServices';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// Define los tipos para el contexto
type AuthContextType = {
  isLoggedIn: boolean;
  userRole: 'admin' | 'user' | null;
  currentUserEmail: string | null;
  currentUserName: string | null;
  currentUserAvatar: string | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (newUser: User) => Promise<{ success: boolean; message: string }>;
  updateAvatar: (fromCamera?: boolean) => Promise<void>;
};

// Crea el contexto con un valor inicial nulo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await setupPredefinedUsers();
        const users = await getAllUsers();
        setAllUsers(users);

        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsLoggedIn(true);
          setUserRole(currentUser.role as 'admin' | 'user');
          setCurrentUserEmail(currentUser.email);
          const matchedUser = users.find(u => u.email === currentUser.email);
          if (matchedUser) {
            setCurrentUserName(matchedUser.user);
            setCurrentUserAvatar(matchedUser.avatar || null);
          }
        }
      } catch (e) {
        console.log("Error al cargar datos:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const storedUser = allUsers.find(u => u.email === email);
      if (storedUser && storedUser.password === pass) {
        const role = storedUser.email === 'admin@gettop.com' ? 'admin' : 'user';
        await saveCurrentUser(storedUser.email, role);
        setIsLoggedIn(true);
        setCurrentUserEmail(storedUser.email);
        setCurrentUserName(storedUser.user);
        setCurrentUserAvatar(storedUser.avatar || null);
        setUserRole(role);
        return true;
      }
      return false;
    } catch (e) {
      console.log("Error en el login:", e);
      return false;
    }
  };

  const logout = async () => {
    try {
      await removeCurrentUser();
      setIsLoggedIn(false);
      setCurrentUserEmail(null);
      setCurrentUserName(null);
      setCurrentUserAvatar(null);
      setUserRole(null);
    } catch (e) {
      console.log("Error al cerrar sesión:", e);
    }
  };

  const register = async (newUser: User): Promise<{ success: boolean; message: string }> => {
    try {
      const existingUser = allUsers.find(u => u.email === newUser.email);
      if (existingUser) {
        return { success: false, message: 'El usuario con este correo ya existe.' };
      }
      const userWithAvatar: User = { ...newUser, avatar: newUser.avatar || '' };
      const updatedUsers = [...allUsers, userWithAvatar];
      await saveAllUsers(updatedUsers);
      setAllUsers(updatedUsers);

      return { success: true, message: 'Usuario registrado correctamente.' };

    } catch (e) {
      console.log("Error en el registro:", e);
      return { success: false, message: 'Error inesperado en el registro.' };
    }
  };

  const updateAvatar = async (fromCamera = false) => {
    if (!currentUserEmail) return;
    try {
      const result = fromCamera
        ? await launchCamera({ mediaType: 'photo', maxWidth: 500, maxHeight: 500 })
        : await launchImageLibrary({ mediaType: 'photo', maxWidth: 500, maxHeight: 500 });

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (!uri) return;

        // Actualizar en AsyncStorage
        const updatedUsers = allUsers.map(u =>
          u.email === currentUserEmail ? { ...u, avatar: uri } : u
        );
        await saveAllUsers(updatedUsers);
        setAllUsers(updatedUsers);

        // Actualizar estado local
        setCurrentUserAvatar(uri);
      }
    } catch (e) {
      console.log("Error al actualizar avatar:", e);
    }
  };

  const value = {
    isLoggedIn,
    userRole,
    currentUserEmail,
    currentUserName,
    currentUserAvatar,
    login,
    logout,
    register,
    updateAvatar,
  };

  if (isLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  return context;
};
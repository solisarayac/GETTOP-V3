import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchImageLibrary } from 'react-native-image-picker';
import HomeScreen from '../screens/Home/HomeScreen';
import VideoScreen from '../screens/Video/VideoScreen';
import Profile from '../screens/Profile/Profile';
import TitiScreen from '../screens/Chatbot/TitiScreen';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import Home from '../assets/svg/home.svg';
import HomeAct from '../assets/svg/homeAct.svg';
import HomeBlack from '../assets/svg/homeBlack.svg';
import Video from '../assets/svg/video.svg';
import PlusAct from '../assets/svg/plusAct.svg';
import VideoBlack from '../assets/svg/videoBlack.svg';
import Profiles from '../assets/svg/profile.svg';
import ProfileAct from '../assets/svg/ProfileAct.svg';
import { Palette } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Alert, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const ICONS = {
  Inicio: { active: HomeAct, inactive: Home, onWhite: HomeBlack },
  Crear: { active: PlusAct, inactive: Video, onWhite: VideoBlack },
  Perfil: { active: ProfileAct, inactive: Profiles, onWhite: ProfileAct },
  Titi: { active: PlusAct, inactive: Video, onWhite: VideoBlack }, // Puedes cambiar icono
} as const;

const UserNavigator = () => {
  const { addVideo } = useVideo();
  const { currentUserEmail, currentUserName } = useAuth();

  const handleUploadVideo = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'video', quality: 1 });
      if (result.didCancel) return;
      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      if (!currentUserEmail) {
        console.log('Debe iniciar sesión para subir videos');
        return;
      }

      addVideo(uri, currentUserEmail);
      console.log(`Video agregado por ${currentUserName || currentUserEmail}`);

      Alert.alert(
        'Video subido',
        'Tu video será revisado por el administrador antes de publicarse.',
        [{ text: 'Aceptar' }]
      );
    } catch (error) {
      console.error('Error al seleccionar video:', error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        const state = navigation.getState();
        const activeRouteName = state.routes[state.index].name;
        const isPerfilActive = activeRouteName === 'Perfil';

        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isPerfilActive ? Palette.white : Palette.darkGray,
            height: 60,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: { fontSize: FontSizes.small, fontWeight: '600' },
          tabBarActiveTintColor: Palette.third,
          tabBarInactiveTintColor: isPerfilActive ? Palette.mediumGray : Palette.white,
          tabBarIcon: ({ focused }) => {
            const IconSet = ICONS[route.name as keyof typeof ICONS];
            if (!IconSet) return null;
            const Icon = isPerfilActive ? IconSet.onWhite : focused ? IconSet.active : IconSet.inactive;
            return <Icon width={24} height={24} />;
          },
        };
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />

      <Tab.Screen
        name="Crear"
        component={VideoScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: focused ? Palette.third : Palette.white,
              }}
            >
              {focused ? 'Crear' : 'Video'}
            </Text>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            const state = navigation.getState();
            const currentRouteName = state.routes[state.index]?.name;
            if (currentRouteName === 'Crear') {
              e.preventDefault();
              handleUploadVideo();
            }
          },
        })}
      />

      <Tab.Screen name="Perfil" component={Profile} />

      <Tab.Screen name="Titi" component={TitiScreen} options={{ tabBarLabel: 'Titi' }} />
    </Tab.Navigator>
  );
};

export default UserNavigator;

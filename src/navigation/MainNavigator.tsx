import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthNavigator from './AuthNavigator';
import FullVideo from '../components/fullVideo/FullVideo';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { isLoggedIn, userRole } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        userRole === 'admin' ? (
          <Stack.Screen name="AdminNavigator" component={AdminNavigator} />
        ) : (
          <>
            <Stack.Screen name="UserNavigator" component={UserNavigator} />
            <Stack.Screen name="FullVideo" component={FullVideo}  />
          </>
        )
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
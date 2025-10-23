import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminScreen from '../screens/Admin/AdminScreen';
import HomeAct from '../assets/svg/homeAct.svg';
import { Palette } from '../constants/Colors';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Palette.third,
        tabBarInactiveTintColor: Palette.white,
        tabBarStyle: {
          backgroundColor: Palette.white,
          borderTopWidth: 0,
          elevation: 1,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <HomeAct
              width={24}
              height={24}
              fill={focused ? Palette.third : Palette.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
import React from 'react';
import { Platform, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';


import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
        headerShown: false,
        tabBarStyle: {
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
          height: 60 + getBottomSpace(),
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused}>
              <Feather name="home" size={30} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused}>
              <Feather name="user" size={30} color={color} />
            </TabBarIcon>
          ),
        }}
      />
    </Navigator>
  );
}

type TabBarIconProps = {
  children: React.ReactNode;
  focused: boolean;
  color: string;
};

function TabBarIcon({ children, focused, color }: TabBarIconProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: focused ? color : 'transparent',
      }}
    >
      {children}
    </View>
  );
}

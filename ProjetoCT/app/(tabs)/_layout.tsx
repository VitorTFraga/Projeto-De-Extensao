import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle:
         Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopColor: Colors[colorScheme ?? 'light'].background,
            borderTopWidth: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: 'Opções',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
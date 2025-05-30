import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { UserProvider, useUser } from '../contexts/userContext';

SplashScreen.preventAutoHideAsync();


const AppContentWithUserContext = () => {
  const { userName, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    console.log("LAYOUT - RENDER. isLoading:", isLoading, "userName:", userName, "segments:", segments);
    if (!isLoading) { 
      const inLoginScreen = segments[0] === 'loginScreen';
      if (userName === '') { 
        if (!inLoginScreen) { 
          console.log("LAYOUT - Redirecionando para /loginScreen (userName vazio)");
          router.replace('/loginScreen'); 
        }
      } else {
        if (inLoginScreen) { 
          console.log("LAYOUT - Redirecionando para /Menu (userName preenchido)");
          router.replace('/Menu'); 
        }
      }
    }
  }, [isLoading, userName, segments, router]);
  
  return <Slot />;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider> 
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppContentWithUserContext /> 
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'}
            backgroundColor={Colors[colorScheme ?? 'light'].background} />
        </ThemeProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
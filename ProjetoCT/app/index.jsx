import React, { useEffect, useState } from 'react';

import 'react-native-gesture-handler'; // Necessário para navegação
import 'react-native-reanimated'; // Garantir que o Reanimated funcione corretamente
import { Redirect } from 'expo-router';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return null; // Pode adicionar um loader aqui futuramente
  }

  // Se o usuário não estiver logado, redireciona para a tela de login
  if (!isLoggedIn) {
    return <Redirect href="/loginScreen" />;
  }

  // Se o usuário estiver logado, redireciona para o Menu
  return <Redirect href="/tabs/Menu" />;
}

const checkIfLoggedIn = async () => {
  return false; // Simulação de verificação de login (mudar para lógica real depois)
};

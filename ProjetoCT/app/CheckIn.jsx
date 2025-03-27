import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const CheckInScreen = () => {
  const route = useRouter();
  const { treino, horario } = useLocalSearchParams(); // Pegando os dados passados

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In</Text>
      <Text style={styles.info}>Treino: {treino ?? 'Não informado'}</Text>
      <Text style={styles.info}>Horário: {horario ?? 'Não informado'}</Text>
      <Button title="Voltar" onPress={() => route.back()} />
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

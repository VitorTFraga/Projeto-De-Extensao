import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';



const CheckInScreen = () => {
  const route = useRouter();
  const { treino, horario } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.topBar} >
        <FontAwesome name="arrow-left"
          size={24}
          color="black"
          style={styles.returnIcon}
          onPress={() => route.back()} />
        <Text style={styles.topBarText}>{treino ?? 'Aula'}</Text>
      </View>
      <View style={styles.infoTopBar}>
        <Text style={styles.infoTopBarText}>{horario}{' - '}{'dia da semana'}</Text>
        <Text style={styles.infoTopBarCalendar}>calendario</Text>
        <Text style={styles.infoTopBarList}>lista de presença</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Check-In</Text>
        <Text style={styles.info}>Treino: {treino ?? 'Não informado'}</Text>
        <Text style={styles.info}>Horário: {horario ?? 'Não informado'}</Text>
      </View>
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
  topBar: {
    width: '100%',
    paddingVertical: 50,
    backgroundColor: '#D47A7A',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  
  topBarText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 223,
  },
  returnIcon: {
    position: 'absolute',
    left: 20,
    top: 55,
    zIndex: 1,
  },
  infoTopBar:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#D3D3D3',
    padding: 10,
  },
  infoTopBarText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

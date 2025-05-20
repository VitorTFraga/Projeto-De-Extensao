import React, { act } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../contexts/userContext';


const CheckInScreen = () => {
  const { nomeUsuario, isLoading } = useUser();
  const [listaAlunos, setListaAlunos] = React.useState([]);
  const route = useRouter();
  const { treino, horario } = useLocalSearchParams();

  if (isLoading) {
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D47A7A" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  /* const addFakeAlunos = () => {
   const fakeAlunos = ['Lucas', 'Ana', 'Pedro', 'Maria', 
      'João', 'Carla', 'Fernanda', 'Ricardo', 'Juliana', 
      'Gabriel', 'Mariana', 'Thiago'];
    const newAlunos = fakeAlunos.filter(aluno => !listaAlunos.includes(aluno));
    const randomAlunos = newAlunos.sort(() => 0.5 - Math.random()).slice(0, 1);
    setListaAlunos([...listaAlunos, ...randomAlunos]);
  }*/

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
        <View style={styles.infoTopBarCalendarStyle}>
          <View style={styles.infoTopBarCalendarDay}>
            <Text style={styles.infoTopBarCalendar}>{new Date().getDate()}</Text>
          </View>
          <View style={styles.infoTopBarCalendarMonth}>
            <Text style={styles.infoTopBarCalendar}>
            {new Date().toLocaleDateString('pt-BR', { month: 'short' })}</Text>
          </View>
        </View>
        <Text style={styles.infoTopBarText}>{horario}{' - '}{new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}</Text>
        <View style={styles.infoTopBarListStyle}>
          <FontAwesome name="user" 
          size={16}
          color="black"
          style={styles.confirmedIcon}/>
          {listaAlunos.length >= 10 ? (
            <Text style={styles.infoTopBarListBig}>{listaAlunos.length}/12</Text>
          ) : (
            <Text style={styles.infoTopBarList}>{listaAlunos.length}/12</Text>
          )}
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {listaAlunos.length > 0 ? (
            listaAlunos.map((aluno, index) => (
              <View key={index} style={styles.alunoBox}>
                <Text style={styles.alunosName}>{aluno}</Text>
              </View>
            ))
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.noAlunosText}>Nenhum aluno confirmado ainda</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => { 
          if (!listaAlunos.includes(nomeUsuario)) {
            setListaAlunos([...listaAlunos, nomeUsuario]);
          } else {
            const novaLista = listaAlunos.filter(aluno => aluno !== nomeUsuario);
            setListaAlunos(novaLista);
          }
          /*addFakeAlunos();*/
        }}>
          <View style={styles.checkInButton}>          
            <Text style={styles.checkInText}>
            {listaAlunos.includes(nomeUsuario) ? 'Cancelar Check-in' : 'Check-in'}
            </Text>
          </View>
        </TouchableOpacity>
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
   loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  topBar: {
    width: '100%',
    paddingVertical: 50,
    backgroundColor: '#D47A7A',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderColor: '#ccc',
  },
  
  topBarText: {
    paddingTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  returnIcon: {
    position: 'absolute',
    left: 20,
    top: 55,
    zIndex: 1,
    padding: 10,
    paddingTop: 30,
  },
  confirmedIcon: {
    marginLeft: 23,
    marginTop: 8,
    marginBottom: -3,
  },
  infoTopBar:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#D3D3D3',
  },
  infoTopBarText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTopBarCalendarStyle:{
    width: '13%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#D47A7A',
    borderRadius: 40,
    paddingHorizontal: 0,
  },
  infoTopBarCalendar: {
    fontSize: 18,
    fontWeight: 'bold',
    fontWeight: '600',
    color: 'black',
  }, 
  infoTopBarCalendarDay:{
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 14,
    borderColor: 'transparent',
    borderBottomWidth: 0,
  },
  infoTopBarCalendarMonth:{
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 9,
    marginTop: -8,
    marginBottom: 8,
  },
  infoTopBarListStyle:{
    width: '16%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#D47A7A',
    borderRadius: 40,
    paddingHorizontal: 0,
  },
  infoTopBarListBig:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: 7,
  },
  infoTopBarList:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
    marginBottom: 7,
  },
  checkInButton: {
    width: 380,
    height: 60,
    backgroundColor: '#D47A7A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  listText:{
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
    marginLeft: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '94%',
    marginTop: 20,
    marginBottom: 20,
  },
  
  scrollContent: {
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 2,
    marginTop: 2,
  },
  noAlunosText:{
    fontSize: 24,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  placeholder: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  alunoBox: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: '#D3D3D3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },  
  alunosName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

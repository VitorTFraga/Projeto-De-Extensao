import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../contexts/userContext';


const CheckInScreen = () => {
  const { nomeUsuario } = useUser();
  const [listaAlunos, setListaAlunos] = React.useState([]);
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
          <Text style={styles.infoTopBarList}>{listaAlunos.length}/12</Text>
        </View>
      </View>

      <View style={styles.scrollContainer}>
        {listaAlunos.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {listaAlunos.map((aluno, index) => (
              <Text key={index} style={styles.listText}>
                {aluno}
              </Text>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.noAlunosText}>Nenhum aluno confirmado ainda</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={() => {
          if (!listaAlunos.includes(nomeUsuario)) {
            setListaAlunos([...listaAlunos, nomeUsuario]);
          }
        }}>
          <View style={styles.checkInButton}>          
            <Text style={styles.checkInText}>Check-in</Text>
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
  },
  confirmedIcon: {
    marginLeft: 18,
    marginTop: 5,
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
    width: '13%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#D47A7A',
    borderRadius: 40,
    paddingHorizontal: 0,
  },
  infoTopBarList:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: 7,
  },
  checkInButton: {
    width: 380,
    height: 60,
    backgroundColor: '#D47A7A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '94%',
    minHeight: 494,
    marginTop: 20,
    marginBottom: 20,
  },
  
  scrollContent: {
    paddingVertical: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginBottom: 4,
    marginTop: 4,
  },
  noAlunosText:{
    fontSize: 24,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  placeholder: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 494,
    backgroundColor: 'white',
  },
});

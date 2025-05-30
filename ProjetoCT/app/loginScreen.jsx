import { View, Text, StyleSheet, Image,TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '../contexts/userContext';

import tigreDeJade from "@/assets/images/tigreDeJade.png";

const RegisterPage = () => {
  const [name, setName] = React.useState('');
  const {userName, updateUserName, isLoading} = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("LOGIN SCREEN - RENDER. isLoading:", isLoading, "userName (do contexto):", userName);
    if(!isLoading && userName !== ''){
      console.log("LOGIN SCREEN - Redirecionando para /Menu (userName preenchido)");
      router.replace('/Menu');
    }
  },[isLoading, userName, router]);

  async function getName(){
    try{
      if(!name.trim()){
        return Alert.alert('atenção','coloque seu nome');
      }
      console.log("LOGIN SCREEN - Tentando salvar nome:", name);
      await updateUserName(name);
      Alert.alert('Nome criado com sucesso!');
      router.replace('/Menu');
    }catch (error){
      console.error("Erro ao fazer login:", error);
      Alert.alert('erro','erro ao logar');
    }
  };

  if(isLoading){
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando preferências...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={tigreDeJade} style={styles.image}/>       
      <View style={styles.boxName}>
        <TextInput style={styles.textBoxName} placeholder="Coloque seu nome"
        value={name}
        onChangeText={setName}/>
      </View>              
      <View>        
        <TouchableOpacity style={styles.button} onPress={getName}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  text: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 30,
    marginBottom: 5,
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    width: Dimensions.get('window').width*0.37,
    fontWeight: 'bold',
    justifyContent: 'center', 
    backgroundColor: 'rgb(216, 103, 103)',
    padding: 4,
    borderRadius: 40,
  },
  textButton: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  boxName: {
    width: Dimensions.get('window').width*0.7,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  textBoxName: {
    fontSize: 15,
  },
});
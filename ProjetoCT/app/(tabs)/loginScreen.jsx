import { View, Text, StyleSheet, Image,TextInput, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import tigreDeJade from "@/assets/images/tigreDeJade.png";

const RegisterPage = () => {
  const [name, setName] = React.useState('');
  const navigation = useNavigation();

  async function getName(){
    try{
      if(!name){
        return alert.alert('atenção','coloque seu nome');
      }
      alert('Nome criado com sucesso!');
        navigation.navigate('Menu');
    }catch (error){
      alert('erro ao logar');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={tigreDeJade} style={styles.image}/>       
      <View style={styles.boxName}>
        <TextInput style={styles.textBoxName} placeholder="Coloque seu nome"
        value={name}
        onChangeText={setName}/>
      </View>              
      <View>
        <Link href="/Menu" asChild>
          <TouchableOpacity style={styles.button} onPress={getName}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
        </Link>
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
import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import tigreDeJade from "@/assets/images/tigreDeJade.png";

const RegisterPage = () => {
  return (
    <View style={styles.container}>
      <Image source={tigreDeJade} style={styles.image}/>
      <Text style={styles.text}>Coloque seu nome</Text>
      <Link href={'/Menu'} style={styles.link}>Criar</Link>
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
    fontSize: 24,
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
  },
  link: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline', 
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 4,
  },
  
});
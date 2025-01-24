import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import simboloTigreDeJade from "@/assets/images/tigreDeJade.png"

const registerPage = () => {
  return (
    <View style={Style.container}>
      <ImageBackground
      source={simboloTigreDeJade}
      style={StyleSheet.image}
      >
      <Text style={Style.nameTitle}>coloque seu nome</Text>
      <Link href={'/Menu'} style={Style.Link} >Menu</Link>
      </ImageBackground>
    </View>
  )
}

export default registerPage

// codigo do css:

const Style = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'white',
  },

  image:{
    width: 60,
    alignItems: 'center',
    justifyContent:'center',
  },

  nameTitle:{
    color: 'white',
    fontSize: 42,
    fontWeight:'bold',
    marginbottom: 120,
  },
  link:{
    color: 'white',
    fontSize: 42,
    fontWeight:'bold',
    textDecorationLine: 'underline',
    padding:4,
  },
})
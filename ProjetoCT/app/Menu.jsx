import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Menu = () => {
  return (
    <View style={[Style.container, {backgroundColor: 'white'}]}>
      <Text>Menu</Text>
    </View>
  )
}

const Style = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default Menu;
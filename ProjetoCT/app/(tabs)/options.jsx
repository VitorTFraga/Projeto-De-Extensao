import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Options = () => {
    const [userName, setUserName] = useState('');

    useEffect(() =>{
        const loadName = async () => {
            const savedName = await AsyncStorage.getItem('userName');
            if(savedName) {
                setUserName(savedName);
            }
        };
        loadName();
    }, []);

    const saveName = async () => {
        await AsyncStorage.setItem('userName', userName);
        alert('Nome salvo com sucesso!');  
    };

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Novo Nome:</Text>
            <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder='digite o novo nome'/>
            <Button title='salvar' onPress={saveName}/>
        </View>        
    );
};

export default Options;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        widht: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
  });
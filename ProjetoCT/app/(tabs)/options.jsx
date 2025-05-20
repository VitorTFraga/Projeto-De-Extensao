import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../../contexts/userContext';

const Options = () => {
    const { nomeUsuario, updateUserName } = useUser();
    const [tempUserName, setTempUserName] = useState(nomeUsuario);

    useEffect(() => {
        setTempUserName(nomeUsuario);
    }, [nomeUsuario]);

    const handleSaveName = async () => {
        
        await updateUserName(tempUserName);
        Alert.alert('Sucesso', 'Nome salvo com sucesso!'); 
    };

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Novo Nome:</Text>
            <TextInput
            style={styles.input}
            value={tempUserName} 
            onChangeText={setTempUserName} 
            placeholder='Digite o novo nome'/>
            <Button title='Salvar' onPress={handleSaveName}/>
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
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
});
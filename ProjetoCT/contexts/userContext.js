import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [nomeUsuario, setNomeUsuario] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 

   
    useEffect(() => {
        const loadUserName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName');
                if (savedName) {
                    setNomeUsuario(savedName); 
                } else {
                
                    setNomeUsuario('Usuário Padrão');
                }
            } catch (error) {
                console.error("Erro ao carregar o nome do usuário do AsyncStorage:", error);
            } finally {
                setIsLoading(false); 
            }
        };

        loadUserName();
    }, []); 

    
    const updateUserName = async (newName) => {
        try {
            await AsyncStorage.setItem('userName', newName);
            setNomeUsuario(newName); 
        } catch (error) {
            console.error("Erro ao salvar o nome do usuário no AsyncStorage:", error);
        }
    };

    return (
        // 
        <UserContext.Provider value={{ nomeUsuario, updateUserName, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
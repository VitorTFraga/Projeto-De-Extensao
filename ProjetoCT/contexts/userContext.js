import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userName, setUserName] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 

   
    useEffect(() => {
        const loadUserName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('userName');
                console.log("USER CONTEXT (loadUserName) - Valor lido do AsyncStorage:", savedName);
                if (savedName !== null) {
                    setUserName(savedName); 
                } else {
                }
            } catch (error) {
                console.error("Erro ao carregar o nome do usuário do AsyncStorage:", error);
            } finally {
                setIsLoading(false); 
                console.log("USER CONTEXT (loadUserName) - Carregamento finalizado. isLoading:", false);
            }
        };

        loadUserName();
    }, []); 

    
    const updateUserName = async (newName) => {
        try {
            await AsyncStorage.setItem('userName', newName);
            setUserName(newName); 
            console.log("USER CONTEXT (updateUserName) - Nome salvo e atualizado:", newName);
        } catch (error) {
            console.error("Erro ao salvar o nome do usuário no AsyncStorage:", error);
        }
    };

    return (
        // 
        <UserContext.Provider value={{ userName, updateUserName, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
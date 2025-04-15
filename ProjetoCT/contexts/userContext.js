import React,{createContext, useState, useContext} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [nomeUsuario, setNomeUsuario] = useState('');

    return (
        <UserContext.Provider value={{nomeUsuario, setUser: setNomeUsuario}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

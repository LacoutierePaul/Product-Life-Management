import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/');
            const userData = await response.json();
            setUser(userData); // Stocker les données utilisateur
        } catch (error) {
            console.error('Erreur de chargement des utilisateurs:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
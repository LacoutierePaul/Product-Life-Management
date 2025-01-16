import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email_user, password_user) => {
        try {
            const response = await fetch('http://localhost:3000/login/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_user, password_user }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setUser(data.user); // Mets à jour le contexte avec les données utilisateur
                return data.user;
            } else if (response.status === 401) {
                throw new Error('Identifiants incorrects.');
            } else {
                throw new Error('Erreur de connexion.');
            }
        } catch (error) {
            console.error('Erreur dans login:', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:3000/logout', { method: 'POST' });
            setUser(null); // Réinitialise l'état utilisateur
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:3000/login/check-session');
            if (response.status === 200) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de la session:', error);
        }
    };

    useEffect(() => {
        checkSession(); // Vérifie la session utilisateur au montage
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
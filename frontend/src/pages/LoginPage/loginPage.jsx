import React, { useState } from 'react';
import './loginPage.css';
import { Login } from "../../api/user.js";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await Login(email, password);
            console.log('Utilisateur connecté:', user);

            // Redirige l'utilisateur si le login est réussi
            navigate('/fournisseurs');
        } catch (error) {
            // Affiche un message d'erreur basé sur l'exception
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="buttonlogin" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

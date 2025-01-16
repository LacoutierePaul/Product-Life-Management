import React, { useState } from 'react';
import { useUser } from '../../context/user.context.jsx';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useUser(); // Utilise le login du UserProvider
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(email, password); // Appelle le login du contexte
            navigate('/fournisseurs'); // Redirige après un login réussi
        } catch (error) {
            setErrorMessage(error.message); // Affiche une erreur si le login échoue
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

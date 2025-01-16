import React, { useState } from 'react';
import './loginPage.css';
import { Login } from "../../api/user.js";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        // Add your authentication logic here
        Login(email, password)
            .then()
            .catch((error) => console.error('Erreur lors du login :', error));
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
                <button className= "buttonlogin" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

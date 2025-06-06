import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'; // Import du fichier CSS pour le Header
import { useUser } from '../../context/user.context.jsx';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    logout()
        .then(() => {
          console.log('Utilisateur déconnecté');
          navigate('/'); // Redirige vers la page de connexion
        })
        .catch(() => alert('Erreur lors de la déconnexion. Veuillez réessayer.'));
  };

  return (
      <header>
        <h1>PLM : Suivi des produits laitiers</h1>
        <div className="header-content">
          {/* Navigation Links */}
          <nav>
            <Link to="/fournisseurs">Fournisseurs</Link>
            <Link to="/planification">Planification</Link>
            <Link to="/qualite">Qualité</Link>
            <Link to="/stocks">Stocks</Link>
            <Link to="/recettes">Recettes</Link>
          </nav>

          {/* Déconnexion */}
          <div className="header-actions">
            <button className="logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>
  );
}

export default Header;
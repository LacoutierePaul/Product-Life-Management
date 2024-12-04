import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';  // Import du fichier CSS pour le Header

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
        
        {/* Recherche */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher..."
          className="search-input"
        />
      </div>
    </header>
  );
}

export default Header;

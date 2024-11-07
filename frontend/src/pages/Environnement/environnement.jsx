import React, { useState, useEffect } from 'react';
import './environnement.css';

function Environnement() {
  const [suiviEnvironnemental, setSuiviEnvironnemental] = useState([]);

  useEffect(() => {
    // Exemple de fetch pour récupérer les données environnementales
    fetch('/api/suivi_environnemental')
      .then((response) => response.json())
      .then((data) => setSuiviEnvironnemental(data));
  }, []);

  return (
    <div className="environnement">
      <h2>Suivi Environnemental</h2>
      <table>
        <thead>
          <tr>
            <th>Mois</th>
            <th>Eau Utilisée (L)</th>
            <th>Energie Utilisée (kWh)</th>
            <th>Déchets Produits (kg)</th>
            <th>Objectifs Eau</th>
            <th>Objectifs Energie</th>
            <th>Objectifs Déchets</th>
          </tr>
        </thead>
        <tbody>
          {suiviEnvironnemental.map((suivi) => (
            <tr key={suivi.id}>
              <td>{new Date(suivi.mois).toLocaleDateString()}</td>
              <td>{suivi.eau_utilisee}</td>
              <td>{suivi.energie_utilisee}</td>
              <td>{suivi.dechets_produits}</td>
              <td>{suivi.objectif_eau}</td>
              <td>{suivi.objectif_energie}</td>
              <td>{suivi.objectif_dechets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Environnement;

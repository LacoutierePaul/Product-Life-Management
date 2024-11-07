import React, { useState, useEffect } from 'react';
import './planification.css';

function Planification() {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    // Exemple de fetch pour récupérer la planification de production
    fetch('/api/production_planifiee')
      .then((response) => response.json())
      .then((data) => setProductions(data));
  }, []);

  return (
    <div className="planification">
      <h2>Planification de la Production</h2>
      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Quantité Planifiée</th>
            <th>Date de Production</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {productions.map((production) => (
            <tr key={production.id}>
              <td>{production.produit_fini}</td>
              <td>{production.quantite_planifiee}</td>
              <td>{new Date(production.date_production).toLocaleDateString()}</td>
              <td>{production.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planification;

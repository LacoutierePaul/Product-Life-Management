import React, { useState, useEffect } from 'react';
import './fournisseurs.css';

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    // Exemple de fetch pour récupérer les fournisseurs depuis l'API
    fetch('/api/fournisseurs')
      .then((response) => response.json())
      .then((data) => setFournisseurs(data));
  }, []);

  return (
    <div className="fournisseurs">
      <h2>Liste des Fournisseurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Matière Première</th>
            <th>Date Dernière Livraison</th>
            <th>Évaluation</th>
            <th>Commentaires</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map((fournisseur) => (
            <tr key={fournisseur.id}>
              <td>{fournisseur.nom}</td>
              <td>{fournisseur.contact}</td>
              <td>{fournisseur.matiere_premiere}</td>
              <td>{new Date(fournisseur.date_derniere_livraison).toLocaleDateString()}</td>
              <td>{fournisseur.evaluation}</td>
              <td>{fournisseur.commentaires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fournisseurs;

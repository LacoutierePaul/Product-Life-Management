import React, { useState, useEffect } from 'react';
import './planification.css';

function Planification() {
  // Données fictives de planification
  const planificationData = [
    { id: 1, produit_fini: 'Yaourt Nature', quantite_planifiee: 200, date_production: '2024-03-01', status: 'Terminé' },
    { id: 2, produit_fini: 'Beurre Clarifié', quantite_planifiee: 100, date_production: '2024-03-02', status: 'En cours' },
    { id: 3, produit_fini: 'Fromage Blanc', quantite_planifiee: 150, date_production: '2024-03-03', status: 'En attente' },
    { id: 4, produit_fini: 'Crème Chantilly', quantite_planifiee: 180, date_production: '2024-03-04', status: 'Terminé' },
    { id: 5, produit_fini: 'Lait Cru Entier', quantite_planifiee: 300, date_production: '2024-03-05', status: 'En attente' },
    { id: 6, produit_fini: 'Fromage Fermier', quantite_planifiee: 120, date_production: '2024-03-06', status: 'En cours' },
    { id: 7, produit_fini: 'Beurre Fermier', quantite_planifiee: 200, date_production: '2024-03-07', status: 'Terminé' },
  ];

  // Utilisation de useState pour gérer l'état des données
  const [productions, setProductions] = useState(planificationData);

  useEffect(() => {
    // Exemple de fetch pour récupérer la planification de production, ici on utilise les données fictives
    // Vous pouvez remplacer ce fetch par un appel API réel si nécessaire
    // fetch('/api/production_planifiee')
    //   .then((response) => response.json())
    //   .then((data) => setProductions(data));
  }, []); // Le tableau vide [] signifie que cet effet ne se déclenche qu'une seule fois, à l'initialisation du composant

  return (
    <div className="planification">
      <h2>Planification de la Production</h2>
      
      {/* Tableau de la planification */}
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

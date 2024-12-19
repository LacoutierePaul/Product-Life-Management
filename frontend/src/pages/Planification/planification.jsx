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

  // Utilisation de useState pour gérer l'état des données et du formulaire
  const [productions, setProductions] = useState(planificationData);
  const [showForm, setShowForm] = useState(false); // Etat pour afficher ou masquer le formulaire
  const [newProduction, setNewProduction] = useState({
    produit_fini: '',
    quantite_planifiee: '',
    date_production: '',
    status: 'En attente',
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduction({
      ...newProduction,
      [name]: value,
    });
  };

  // Fonction pour ajouter une nouvelle planification
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = productions.length + 1; // On génère un nouvel ID basé sur la taille actuelle du tableau
    const updatedProductions = [
      ...productions,
      { id: newId, ...newProduction },
    ];
    setProductions(updatedProductions);
    setShowForm(false); // Fermer le formulaire après soumission
    setNewProduction({
      produit_fini: '',
      quantite_planifiee: '',
      date_production: '',
      status: 'En attente',
    });
  };

  return (
    <div className="planification">
      <h2>Planification de la Production</h2>

      {/* Bouton pour afficher ou masquer le formulaire d'ajout */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter une Planification'}
      </button>

      {/* Formulaire d'ajout de planification */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Produit Fini:</label>
            <input
              type="text"
              name="produit_fini"
              value={newProduction.produit_fini}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Quantité Planifiée:</label>
            <input
              type="number"
              name="quantite_planifiee"
              value={newProduction.quantite_planifiee}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date de Production:</label>
            <input
              type="date"
              name="date_production"
              value={newProduction.date_production}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={newProduction.status}
              onChange={handleInputChange}
            >
              <option value="Terminé">Terminé</option>
              <option value="En cours">En cours</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      )}

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

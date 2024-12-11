import React, { useState, useEffect } from 'react';
import './fournisseurs.css';

function Fournisseurs() {
  //const [fournisseurs, setFournisseurs] = useState([]);

  const fournisseursFictifs = [
    {
      id: 1,
      nom: "La Ferme des Prés",
      contact: "contact@fermedespres.fr",
      matiere_premiere: "Lait Cru",
      date_derniere_livraison: "2024-04-15",
      evaluation: 5,
      commentaires: "Excellent service"
    },
    {
      id: 2,
      nom: "Crèmerie Belle Laitière",
      contact: "info@bellelaitiere.fr",
      matiere_premiere: "Crème Fraîche",
      date_derniere_livraison: "2024-04-10",
      evaluation: 4,
      commentaires: "Livraison rapide"
    },
    {
      id: 3,
      nom: "Beurrier du Terroir",
      contact: "ventes@beurrierduterroir.fr",
      matiere_premiere: "Beurre Fermier",
      date_derniere_livraison: "2024-04-12",
      evaluation: 5,
      commentaires: "Qualité exceptionnelle"
    }
  ];

  const [fournisseurs, setFournisseurs] = useState(fournisseursFictifs); // Utilisation des données fictives


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

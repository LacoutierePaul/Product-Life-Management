import React, { useState, useEffect } from 'react';
import './qualite.css';

function Qualite() {

  const controleQualiteFictif = [
    {
      id: 1,
      id_production: 5,
      date_controle: "2024-01-13",
      resultat: "Réussi",
      commentaire: "Texture parfaite."
    },
    {
      id: 2,
      id_production: 7,
      date_controle: "2024-01-17",
      resultat: "Réussi",
      commentaire: "Produit conforme."
    },
    {
      id: 3,
      id_production: 1,
      date_controle: "2024-01-05",
      resultat: "Échec",
      commentaire: "Acidité anormale."
    },
    {
      id: 4,
      id_production: 6,
      date_controle: "2024-01-15",
      resultat: "Réussi",
      commentaire: "Bonne maturation."
    },
    {
      id: 5,
      id_production: 10,
      date_controle: "2024-01-21",
      resultat: "Réussi",
      commentaire: "Saveur équilibrée."
    },
    {
      id: 6,
      id_production: 3,
      date_controle: "2024-01-09",
      resultat: "Réussi",
      commentaire: "Bon conditionnement."
    },
    {
      id: 7,
      id_production: 8,
      date_controle: "2024-01-18",
      resultat: "Échec",
      commentaire: "Couleur non homogène."
    },
    {
      id: 8,
      id_production: 14,
      date_controle: "2024-01-26",
      resultat: "Réussi",
      commentaire: "Stable en conservation."
    },
    {
      id: 9,
      id_production: 15,
      date_controle: "2024-01-28",
      resultat: "Réussi",
      commentaire: "Texture légère."
    },
    {
      id: 10,
      id_production: 12,
      date_controle: "2024-01-24",
      resultat: "Échec",
      commentaire: "Odeur trop forte."
    }
  ];
  const [controleQualite, setControleQualite] = useState(controleQualiteFictif);

  useEffect(() => {
    // Exemple de fetch pour récupérer les contrôles qualité
    fetch('/api/controle_qualite')
      .then((response) => response.json())
      .then((data) => setControleQualite(data));
  }, []);

  return (
    <div className="qualite">
      <h2>Contrôle Qualité</h2>
      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Date du Contrôle</th>
            <th>Résultat</th>
            <th>Commentaire</th>
          </tr>
        </thead>
        <tbody>
          {controleQualite.map((controle) => (
            <tr key={controle.id}>
              <td>{controle.produit_fini}</td>
              <td>{new Date(controle.date_controle).toLocaleDateString()}</td>
              <td>{controle.resultat}</td>
              <td>{controle.commentaire}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Qualite;

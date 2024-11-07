import React, { useState, useEffect } from 'react';
import './qualite.css';

function Qualite() {
  const [controleQualite, setControleQualite] = useState([]);

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

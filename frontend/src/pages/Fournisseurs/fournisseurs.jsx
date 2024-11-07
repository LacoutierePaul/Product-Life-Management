import { useState } from 'react';

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([
    { id: 1, nom: 'Fournisseur A', type: 'Matière A', derniereLivraison: '2024-10-01', evaluation: 4, commentaires: '' },
    { id: 2, nom: 'Fournisseur B', type: 'Matière B', derniereLivraison: '2024-10-05', evaluation: 3, commentaires: '' },
  ]);
  
  const handleEvaluation = (id, evaluation) => {
    setFournisseurs(fournisseurs.map(f => f.id === id ? { ...f, evaluation } : f));
  };

  return (
    <div>
      <h2>Suivi des Fournisseurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type de matière</th>
            <th>Dernière Livraison</th>
            <th>Évaluation</th>
            <th>Commentaires</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map(f => (
            <tr key={f.id}>
              <td>{f.nom}</td>
              <td>{f.type}</td>
              <td>{f.derniereLivraison}</td>
              <td>
                <input 
                  type="number" 
                  value={f.evaluation} 
                  min="1" 
                  max="5"
                  onChange={(e) => handleEvaluation(f.id, e.target.value)}
                />
              </td>
              <td>
                <textarea 
                  value={f.commentaires} 
                  onChange={(e) => {
                    const updatedFournisseurs = fournisseurs.map(item => 
                      item.id === f.id ? { ...item, commentaires: e.target.value } : item
                    );
                    setFournisseurs(updatedFournisseurs);
                  }} 
                  placeholder="Ajouter un commentaire" 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fournisseurs;

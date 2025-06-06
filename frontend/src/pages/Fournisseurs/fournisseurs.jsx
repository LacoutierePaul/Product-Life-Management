import React, { useState, useEffect } from 'react';
import './fournisseurs.css';
import { getFournisseurs, updateFournisseur, deleteFournisseur, addFournisseur } from '../../api/fournisseurs';

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [showForm, setShowForm] = useState(false);
        const [searchTerm, setSearchTerm] = useState(''); // State for search term
  
  const [newFournisseur, setNewFournisseur] = useState({
    nom_fournisseur: '',
    contact: '',
    updatedAt: new Date().toISOString(),
    evaluation: 0,
    commentaire: ''
  });

  // Charger les fournisseurs depuis l'API
  useEffect(() => {
    getFournisseurs()
      .then((response) => setFournisseurs(response))
      .catch((error) => console.error('Erreur lors du chargement des fournisseurs:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFournisseur({
      ...newFournisseur,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convertir la date "updatedAt" en format ISO 8601 avec l'heure actuelle
    const isoDate = new Date(newFournisseur.updatedAt).toISOString();
  
    // Mettre à jour "updatedAt" avec la date au format ISO
    const fournisseurToSubmit = { ...newFournisseur, updatedAt: isoDate };
  
    if (newFournisseur.idfournisseur) {
      // Mise à jour d'un fournisseur existant
      updateFournisseur(newFournisseur.idfournisseur, fournisseurToSubmit)
        .then((updatedFournisseur) => {
          setFournisseurs(fournisseurs.map(f => f.idfournisseur === updatedFournisseur.idfournisseur ? updatedFournisseur : f));
        })
        .catch((error) => console.error('Erreur lors de la mise à jour du fournisseur:', error));
    } else {
      // Ajouter un nouveau fournisseur
      addFournisseur(fournisseurToSubmit)
        .then((addedFournisseur) => {
          setFournisseurs([...fournisseurs, addedFournisseur]);
        })
        .catch((error) => console.error('Erreur lors de l\'ajout du fournisseur:', error));
    }
  

    setShowForm(false); // Fermer le formulaire
    setNewFournisseur({
      nom_fournisseur: '',
      contact: '',
      evaluation: 0,
      commentaire: '',
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = (idfournisseur) => {
    deleteFournisseur(idfournisseur)
      .then(() => {
        setFournisseurs(fournisseurs.filter(f => f.idfournisseur !== idfournisseur));
      })
      .catch((error) => console.error('Erreur lors de la suppression du fournisseur:', error));
  };


  

  const handleEdit = (fournisseur) => {
    setNewFournisseur(fournisseur);
    setShowForm(true);
  };


  const handleDeleteWithConfirmation = (idfournisseur) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?');
    if (confirmDelete) {
      handleDelete(idfournisseur);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredFournisseurs = fournisseurs.filter((fournisseur) => {
    return (
      fournisseur.nom_fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fournisseur.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fournisseur.commentaire.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  );
  

  return (
    <div className="fournisseurs">
      <h2>Liste des Fournisseurs</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter un Fournisseur'}
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom:</label>
            <input
              type="text"
              name="nom_fournisseur"
              value={newFournisseur.nom_fournisseur}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="email"
              name="contact"
              value={newFournisseur.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date Dernière Livraison:</label>
            <input
              type="date"
              name="updatedAt"
              value={newFournisseur.updatedAt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Évaluation:</label>
            <input
              type="number"
              name="evaluation"
              value={newFournisseur.evaluation}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Commentaire:</label>
            <textarea
              name="commentaire"
              value={newFournisseur.commentaire}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit">{newFournisseur.idfournisseur ? 'Modifier' : 'Ajouter'}</button>
        </form>
      )}
     <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un fournisseur..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Date Dernière Livraison</th>
            <th>Évaluation</th>
            <th>Commentaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFournisseurs.map((fournisseur) => (
            <tr key={fournisseur.idfournisseur}>
              <td>{fournisseur.nom_fournisseur}</td>
              <td>{fournisseur.contact}</td>
              <td>{new Date(fournisseur.updatedAt).toLocaleDateString()}</td>
              <td>{fournisseur.evaluation}</td>
              <td>{fournisseur.commentaire}</td>
              <td>
                <button className="btn-modifier" onClick={() => handleEdit(fournisseur)}>
                  Modifier
                </button>
                <button className="btn-supprimer" onClick={() => handleDeleteWithConfirmation(fournisseur.idfournisseur)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fournisseurs;

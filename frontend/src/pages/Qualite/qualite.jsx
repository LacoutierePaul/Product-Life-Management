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
  const [newControle, setNewControle] = useState({
    id_production: '',
    date_controle: '',
    resultat: '',
    commentaire: ''
  });

  const [showForm, setShowForm] = useState(false); // Nouvel état pour afficher/masquer le formulaire
  const [editingId, setEditingId] = useState(null); // ID du contrôle qualité en cours d'édition

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewControle((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      // Modifier le contrôle qualité existant
      setControleQualite((prevState) =>
        prevState.map((controle) =>
          controle.id === editingId ? { ...controle, ...newControle } : controle
        )
      );
    } else {
      // Ajouter un nouveau contrôle qualité
      const newControleWithId = {
        ...newControle,
        id: controleQualite.length + 1, // Générer un ID unique
      };
      setControleQualite((prevState) => [...prevState, newControleWithId]);
    }

    // Réinitialiser le formulaire
    setNewControle({
      id_production: '',
      date_controle: '',
      resultat: '',
      commentaire: ''
    });

    // Fermer le formulaire après soumission
    setShowForm(false);
    setEditingId(null); // Réinitialiser l'ID d'édition
  };

  const handleDelete = (id) => {
    // Supprimer l'élément avec l'ID spécifié
    setControleQualite((prevState) =>
      prevState.filter((controle) => controle.id !== id)
    );
  };

  const handleEdit = (controle) => {
    // Charger les données du contrôle à modifier dans le formulaire
    setNewControle(controle);
    setEditingId(controle.id); // Définir l'ID de l'élément en cours d'édition
    setShowForm(true); // Afficher le formulaire
  };

  useEffect(() => {
    // Exemple de fetch pour récupérer les contrôles qualité
    fetch('/api/controle_qualite')
      .then((response) => response.json())
      .then((data) => setControleQualite(data));
  }, []);

  return (
    <div className="qualite">
      <h2>Contrôle Qualité</h2>
      
      {/* Bouton pour afficher/masquer le formulaire */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter un contrôle qualité'}
      </button>

      {/* Formulaire d'ajout ou de modification de contrôle qualité */}
      {showForm && (
        <form onSubmit={handleSubmit} className="ajout-controle-form">
          <div>
            <label htmlFor="id_production">ID de Production:</label>
            <input
              type="number"
              id="id_production"
              name="id_production"
              value={newControle.id_production}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="date_controle">Date du Contrôle:</label>
            <input
              type="date"
              id="date_controle"
              name="date_controle"
              value={newControle.date_controle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="resultat">Résultat:</label>
            <select
              id="resultat"
              name="resultat"
              value={newControle.resultat}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Réussi">Réussi</option>
              <option value="Échec">Échec</option>
            </select>
          </div>

          <div>
            <label htmlFor="commentaire">Commentaire:</label>
            <textarea
              id="commentaire"
              name="commentaire"
              value={newControle.commentaire}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">
            {editingId !== null ? 'Modifier le contrôle qualité' : 'Ajouter le contrôle qualité'}
          </button>
        </form>
      )}

      {/* Tableau des contrôles qualité */}
      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Date du Contrôle</th>
            <th>Résultat</th>
            <th>Commentaire</th>
            <th>Action</th> {/* Nouvelle colonne pour les actions */}
          </tr>
        </thead>
        <tbody>
          {controleQualite.map((controle) => (
            <tr key={controle.id}>
              <td>{controle.id_production}</td>
              <td>{new Date(controle.date_controle).toLocaleDateString()}</td>
              <td>{controle.resultat}</td>
              <td>{controle.commentaire}</td>
              <td>
                {/* Bouton pour modifier la ligne */}
                <button onClick={() => handleEdit(controle)}>
                  Modifier
                </button>
                {/* Bouton pour supprimer la ligne */}
                <button onClick={() => handleDelete(controle.id)}>
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

export default Qualite;

import React, { useState, useEffect } from 'react';
import './qualite.css';
import { getControleQualites, updateControleQualite, deleteControleQualite, addControleQualite } from '../../api/controle_qualite';

function Qualite() {
  const [controleQualite, setControleQualite] = useState([]);
  const [newControle, setNewControle] = useState({
    idproductionplanifiee: '',
    updatedAt: '',
    resultat: '',
    commentaire_controle: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchControleQualite = async () => {
    try {
      const data = await getControleQualite();
      setControleQualite(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles qualité:', error);
    }
  };

  useEffect(() => {
    fetchControleQualite();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewControle((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId !== null) {
      try {
        await updateControleQualite(editingId, newControle);
        setControleQualite((prevState) =>
          prevState.map((controle) =>
            controle.idcontrole === editingId ? { ...controle, ...newControle } : controle
          )
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour du contrôle qualité:', error);
      }
    } else {
      try {
        const createdControle = await addControleQualite(newControle);
        setControleQualite((prevState) => [...prevState, createdControle]);
      } catch (error) {
        console.error("Erreur lors de l'ajout du contrôle qualité:", error);
      }
    }

    setNewControle({
      idproductionplanifiee: '',
      updatedAt: '',
      resultat: '',
      commentaire_controle: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteControleQualite(id);
      setControleQualite((prevState) =>
        prevState.filter((controle) => controle.idcontrole !== id)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression du contrôle qualité:', error);
    }
  };

  const handleEdit = (controle) => {
    setNewControle({
      idproductionplanifiee: controle.idproductionplanifiee,
      updatedAt: controle.updatedAt,
      resultat: controle.resultat,
      commentaire_controle: controle.commentaire_controle
    });
    setEditingId(controle.idcontrole);
    setShowForm(true);
  };

  return (
    <div className="qualite">
      <h2>Contrôle Qualité</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter un contrôle qualité'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="ajout-controle-form">
          <div>
            <label htmlFor="idproductionplanifiee">ID de Production:</label>
            <input
              type="number"
              id="idproductionplanifiee"
              name="idproductionplanifiee"
              value={newControle.idproductionplanifiee}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="updatedAt">Date du Contrôle:</label>
            <input
              type="date"
              id="updatedAt"
              name="updatedAt"
              value={newControle.updatedAt}
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
            <label htmlFor="commentaire_controle">Commentaire:</label>
            <textarea
              id="commentaire_controle"
              name="commentaire_controle"
              value={newControle.commentaire_controle}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">
            {editingId !== null ? 'Modifier le contrôle qualité' : 'Ajouter le contrôle qualité'}
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Date du Contrôle</th>
            <th>Résultat</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {controleQualite.map((controle) => (
            <tr key={controle.idcontrole}>
              <td>{controle.idproductionplanifiee}</td>
              <td>{new Date(controle.updatedAt).toLocaleDateString()}</td>
              <td>{controle.resultat}</td>
              <td>{controle.commentaire_controle}</td>
              <td>
                <button onClick={() => handleEdit(controle)}>Modifier</button>
                <button onClick={() => handleDelete(controle.idcontrole)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Qualite;

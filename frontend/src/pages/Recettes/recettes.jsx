import React, { useState, useEffect } from 'react';
import './recettes.css';
import { GetRecettes } from '../../api/recettes'
const Recettes = () => {
  // Données fictives
  const [recettes, setRecettes] = useState([

  ]);


  useEffect(() => {
    GetRecettes()
      .then((response) => setRecettes(response))
      .catch((error) => console.error('Erreur lors du chargement des fournisseurs:', error));
  }, []);

  console.log(Recettes)
  const [showForm, setShowForm] = useState(false);
  const [newRecette, setNewRecette] = useState({
    nom: '',
    description: '',
    ingredients: [{ matiere: '', quantite: '', unite: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecette({
      ...newRecette,
      [name]: value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = [...newRecette.ingredients];
    updatedIngredients[index][name] = value;
    setNewRecette({ ...newRecette, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setNewRecette({
      ...newRecette,
      ingredients: [...newRecette.ingredients, { matiere: '', quantite: '', unite: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecettes([...recettes, { ...newRecette, id: Date.now() }]);
    setShowForm(false);
    setNewRecette({ nom: '', description: '', ingredients: [{ matiere: '', quantite: '', unite: '' }] });
  };

  const handleDelete = (id) => {
    setRecettes(recettes.filter((recette) => recette.id !== id));
  };

  return (
    <div className="recettes">
      <h2>Liste des Recettes</h2>

      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Annuler' : 'Ajouter une Recette'}</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom:</label>
            <input
              type="text"
              name="nom"
              value={newRecette.nom}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newRecette.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <h3>Ingrédients:</h3>
            {newRecette.ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="matiere"
                  value={ingredient.matiere}
                  onChange={(e) => handleIngredientChange(e, index)}
                  placeholder="Matière"
                  required
                />
                <input
                  type="number"
                  name="quantite"
                  value={ingredient.quantite}
                  onChange={(e) => handleIngredientChange(e, index)}
                  placeholder="Quantité"
                  required
                />
                <input
                  type="text"
                  name="unite"
                  value={ingredient.unite}
                  onChange={(e) => handleIngredientChange(e, index)}
                  placeholder="Unité"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Ajouter un ingrédient
            </button>
          </div>
          <button type="submit">{newRecette.id ? 'Modifier' : 'Ajouter'}</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Ingrédients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recettes.map((recette) => (
            <tr key={recette.id}>
              <td>{recette.nom}</td>
              <td>{recette.description}</td>
              <td>
                <ul>
                  {(recette.ingredients || []).map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.matiere} - {ingredient.quantite} {ingredient.unite}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="modifier" onClick={() => handleDelete(recette.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recettes;

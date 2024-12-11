import React, { useState } from 'react';
import './recettes.css';

const Recettes = () => {
  // Données fictives
  const [recettes, setRecettes] = useState([
    {
      id: 1,
      nom: 'Yaourt Nature',
      description: 'Un yaourt naturel et savoureux.',
      ingredients: [
        { matiere: 'Lait', quantite: 1, unite: 'litre' },
        { matiere: 'Ferment lactique', quantite: 1, unite: 'cuillère à café' },
      ],
    },
    {
      id: 2,
      nom: 'Fromage Blanc',
      description: 'Crémeux et délicieux, idéal pour les desserts.',
      ingredients: [
        { matiere: 'Lait', quantite: 2, unite: 'litres' },
        { matiere: 'Présure', quantite: 0.5, unite: 'cuillère à café' },
      ],
    },
    {
      id: 3,
      nom: 'Crème Dessert au Chocolat',
      description: 'Un dessert onctueux pour les gourmands.',
      ingredients: [
        { matiere: 'Lait', quantite: 0.5, unite: 'litre' },
        { matiere: 'Chocolat', quantite: 200, unite: 'grammes' },
        { matiere: 'Sucre', quantite: 50, unite: 'grammes' },
        { matiere: 'Amidon', quantite: 20, unite: 'grammes' },
      ],
    },
  ]);

  // Nouveaux champs pour la recette à ajouter
  const [newRecette, setNewRecette] = useState({
    nom: '',
    description: '',
    ingredients: [
      { matiere: '', quantite: '', unite: '' },
    ],
  });

  const handleRecetteChange = (e) => {
    const { name, value } = e.target;
    setNewRecette({
      ...newRecette,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...newRecette.ingredients];
    updatedIngredients[index][name] = value;
    setNewRecette({ ...newRecette, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setNewRecette({
      ...newRecette,
      ingredients: [...newRecette.ingredients, { matiere: '', quantite: '', unite: '' }],
    });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = newRecette.ingredients.filter((_, i) => i !== index);
    setNewRecette({ ...newRecette, ingredients: updatedIngredients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecetteWithId = {
      ...newRecette,
      id: recettes.length + 1,
    };
    setRecettes([...recettes, newRecetteWithId]);
    setNewRecette({ nom: '', description: '', ingredients: [{ matiere: '', quantite: '', unite: '' }] });
  };

  return (
    <div className="recettes-container">
      <h1>Recettes</h1>

      {/* Formulaire d'ajout d'une recette */}
      <form onSubmit={handleSubmit} className="ajout-recette-form">
        <div>
          <label>Nom de la recette:</label>
          <input
            type="text"
            name="nom"
            value={newRecette.nom}
            onChange={handleRecetteChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newRecette.description}
            onChange={handleRecetteChange}
            required
          />
        </div>

        <h3>Ingrédients :</h3>
        {newRecette.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-form">
            <div>
              <label>Matière:</label>
              <input
                type="text"
                name="matiere"
                value={ingredient.matiere}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Quantité:</label>
              <input
                type="number"
                name="quantite"
                value={ingredient.quantite}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Unité:</label>
              <input
                type="text"
                name="unite"
                value={ingredient.unite}
                onChange={(e) => handleIngredientChange(index, e)}
                required
              />
            </div>
            <button type="button" onClick={() => removeIngredient(index)}>Supprimer cet ingrédient</button>
          </div>
        ))}

        <button type="button" onClick={addIngredient}>Ajouter un ingrédient</button>

        <button type="submit">Ajouter la recette</button>
      </form>

      {/* Liste des recettes */}
      {recettes.map((recette) => (
        <div key={recette.id} className="recette-card">
          <h2>{recette.nom}</h2>
          <p>{recette.description}</p>
          <h3>Ingrédients :</h3>
          <ul>
            {recette.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.matiere} - {ingredient.quantite} {ingredient.unite}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Recettes;

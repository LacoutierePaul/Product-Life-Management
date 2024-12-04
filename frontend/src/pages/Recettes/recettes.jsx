import React from 'react';
import './recettes.css';

const Recettes = () => {
  // Données fictives
  const recettes = [
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
  ];

  return (
    <div className="recettes-container">
      <h1>Recettes</h1>
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

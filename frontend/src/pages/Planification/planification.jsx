import React, { useState, useEffect } from 'react';
import './planification.css';

function Planification() {
    const [selectedOption, setSelectedOption] = useState('commande_stocks');
    const [stockOrders, setStockOrders] = useState([]);
    const [recipeOrders, setRecipeOrders] = useState([]);

    useEffect(() => {
        setStockOrders([
            { nom: 'Lait', quantite: 100, unite: 'L', date: '2024-01-10' },
            { nom: 'Fromage', quantite: 50, unite: 'kg', date: '2024-01-09' }
        ]);

        setRecipeOrders([
            { nomRecette: 'Yaourt maison', description: 'Yaourt nature fait maison', ingredients: 'Lait, Ferment', quantite: 2, date: '2024-01-08' },
            { nomRecette: 'Crème dessert', description: 'Crème dessert au chocolat', ingredients: 'Lait, Chocolat, Sucre', quantite: 3, date: '2024-01-07' }
        ]);
    }, []);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="planification">
            <h2>Historique des Commandes</h2>

            <label>Choisir le type d'historique :</label>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="commande_stocks">Commande de Stocks</option>
                <option value="commande_recettes">Commande des Recettes</option>
            </select>

            {selectedOption === 'commande_stocks' ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>Date de Commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.nom}</td>
                                <td>{order.quantite}</td>
                                <td>{order.unite}</td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom de la Recette</th>
                            <th>Description</th>
                            <th>Ingrédients</th>
                            <th>Quantité</th>
                            <th>Date de Préparation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeOrders.map((recipe, index) => (
                            <tr key={index}>
                                <td>{recipe.nomRecette}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.ingredients}</td>
                                <td>{recipe.quantite}</td>
                                <td>{recipe.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Planification;

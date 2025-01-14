import React, { useState, useEffect } from 'react';
import './planification.css';
import { getRecipeOrders } from "../../api/production_planifiee.js";
import { getStockOrders } from "../../api/commandes_stocks.js";

function Planification() {
    const [selectedOption, setSelectedOption] = useState('commande_stocks');
    const [stockOrders, setStockOrders] = useState([]);
    const [recipeOrders, setRecipeOrders] = useState([]);

    useEffect(() => {
        getRecipeOrders()
            .then((response) => setRecipeOrders(response))
            .catch((error) => console.error('Erreur lors du chargement de l historique de recette:', error));
        getStockOrders()
            .then((response) => setStockOrders(response))
            .catch((error) => console.error('Erreur lors du chargement de l historique de stocks:', error));
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
                            <th>Fournisseur</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>Statut de la Commande</th>
                            <th>Date de Commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.Stock.nom_ingredient}</td>
                                <td>{order.idfournisseur}</td>
                                <td>{order.quantite_commande}</td>
                                <td>{order.Stock.unite}</td>
                                <td>{order.statut_commande}</td>
                                <td>{order.createdAt}</td>
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
                            <th>Quantité</th>
                            <th>Statut de la Commande</th>
                            <th>Date de Commande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeOrders.map((recipe, index) => (
                            <tr key={index}>
                                <td>{recipe.Recette.nom_recette}</td>
                                <td>{recipe.Recette.description}</td>
                                <td>{recipe.quantite_planifiee}</td>
                                <td>{recipe.status}</td>
                                <td>{recipe.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Planification;

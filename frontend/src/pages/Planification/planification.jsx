import React, { useState, useEffect } from 'react';
import './planification.css';
import { getRecipeOrders, updateProductionPlanifiee } from "../../api/production_planifiee.js";
import { getStockOrders,updateCommandeStocks } from "../../api/commandes_stocks.js";

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

    const handleStatusChange = (id, newStatus, type) => {
        if (type === 'recette') {
            // Update status for recipe orders
            updateProductionPlanifiee(id, {status:newStatus})
                .then(() => {
                    setRecipeOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order.idproductionplanifiee === id ? { ...order, status: newStatus } : order
                        )
                    );l
                })
                .catch((error) => console.error('Erreur lors de la mise à jour du statut:', error));
        } else if (type === 'stock') {
            // Update status for stock orders
            updateCommandeStocks(id, {statut_commande :newStatus})
                .then(() => {
                    setStockOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order.idcommande === id ? { ...order, statut_commande: newStatus } : order
                        )
                    );
                })
                .catch((error) => console.error('Erreur lors de la mise à jour du statut:', error));
        }
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
                                <td>
                                    <select
                                        value={order.statut_commande}
                                        onChange={(e) => handleStatusChange(order.idcommande, e.target.value, 'stock')}
                                    >
                                        <option value="en attente">En attente</option>
                                        <option value="en cours">En cours</option>
                                        <option value="Terminé">Terminé</option>
                                    </select>
                                </td>
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
                                <td>
                                    <select
                                        value={recipe.status}
                                        onChange={(e) => handleStatusChange(recipe.idproductionplanifiee, e.target.value, 'recette')}
                                    >
                                        <option value="en attente">En attente</option>
                                        <option value="en cours">En cours</option>
                                        <option value="Terminé">Terminé</option>
                                    </select>
                                </td>
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

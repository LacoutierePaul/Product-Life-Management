import React, { useState, useEffect } from "react";
import "./recettes.css";
import { GetRecettesWithStocks } from "../../api/recettestostocks.js";

const Recettes = () => {
    const [recettes, setRecettes] = useState([]); // Contient la liste des recettes
    const [expandedRecipeId, setExpandedRecipeId] = useState(null); // Stocke l'ID de la recette actuellement développée

    // Charger les recettes au montage du composant
    useEffect(() => {
        GetRecettesWithStocks()
            .then((response) => {
                console.log("Données reçues de l'API :", response);
                if (Array.isArray(response)) {
                    setRecettes(response); // Vérifie que la réponse est un tableau avant de l'utiliser
                } else {
                    console.error("La réponse reçue n'est pas un tableau :", response);
                }
            })
            .catch((error) =>
                console.error("Erreur lors du chargement des recettes:", error)
            );
    }, []);

    // Fonction pour basculer l'état développé/caché
    const toggleExpand = (id) => {
        setExpandedRecipeId(expandedRecipeId === id ? null : id);
    };

    return (
        <div className="recettes">
            <h2>Liste des Recettes</h2>

            <div className="recette-list">
                {recettes.map((recette) => (
                    <div key={recette.idrecette} className="recette-item">
                        <div className="recette-header">
                            <h3>{recette.nom_recette}</h3>
                            <p>{recette.description}</p>
                            <button onClick={() => toggleExpand(recette.idrecette)}>
                                {expandedRecipeId === recette.idrecette
                                    ? "Réduire"
                                    : "Voir les ingrédients"}
                            </button>
                        </div>

                        {expandedRecipeId === recette.idrecette && (
                            <div className="recette-details">
                                <h4>Ingrédients :</h4>
                                {Array.isArray(recette.Stocks) && recette.Stocks.length > 0 ? (
                                    <ul>
                                        {recette.Stocks.map((stock) => (
                                            <li key={stock.idstock}>
                                                {stock.nom_ingredient || "Nom inconnu"} -{" "}
                                                {stock.RecetteToStocks?.quantite || 0} {stock.unite || "unité inconnue"}{" "}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Aucun ingrédient trouvé pour cette recette.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recettes;

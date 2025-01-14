import React, { useState, useEffect } from "react";
import "./recettes.css";
import { GetRecettesWithStocks } from "../../api/recettestostocks.js";

const Recettes = () => {
    const [recettes, setRecettes] = useState([]); // Contient la liste des recettes
    const [expandedRecipeId, setExpandedRecipeId] = useState(null); // Stocke l'ID de la recette actuellement développé pour les ingrédients
    const [expandedHistoryId, setExpandedHistoryId] = useState(null); // Stocke l'ID de la recette actuellement développé pour l'historique

    const history = [
        {
            idrecette: 1,
            nom_recette: "Yaourt Nature Maison",
            historique: [
                {
                    date: "2023-10-15",
                    ingredients: [
                        { nom: "Lait Cru", quantite: "6L" },
                        { nom: "Ferments Lactiques", quantite: "1kg" },
                    ],
                },
            ],
        },
        {
            idrecette: 2,
            nom_recette: "Danette Chocolat",
            historique: [
                {
                    date: "2023-01-02",
                    ingredients: [
                        { nom: "Ferments Lactiques", quantite: "1L" },
                        { nom: "Chocolat au lait", quantite: "3kg" },
                        { nom: "Sucre", quantite: "1,5kg" },
                    ],
                },
                {
                    date: "2023-01-03",
                    ingredients: [
                        { nom: "Ferments Lactiques", quantite: "1L" },
                        { nom: "Chocolat noir", quantite: "3kg" },
                        { nom: "Sucre", quantite: "2kg" },
                    ],
                },
            ],
        },
    ];

    // Charger les recettes au montage du composant
    useEffect(() => {
        GetRecettesWithStocks()
            .then((response) => {
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

    // Fonction pour basculer l'affichage des ingrédients
    const toggleExpand = (id) => {
        setExpandedRecipeId(expandedRecipeId === id ? null : id);
    };

    // Fonction pour basculer l'affichage de l'historique
    const toggleExpandHistory = (id) => {
        setExpandedHistoryId(expandedHistoryId === id ? null : id);
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
                                    ? "Masquer les ingrédients"
                                    : "Voir les ingrédients"}
                            </button>
                            <button onClick={() => toggleExpandHistory(recette.idrecette)}>
                                {expandedHistoryId === recette.idrecette
                                    ? "Masquer l'historique"
                                    : "Voir l'historique"}
                            </button>
                        </div>

                        {/* Détails des ingrédients */}
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

                        {/* Historique */}
                        {expandedHistoryId === recette.idrecette && (
                            <div className="recette-history">
                                <h4>Historique :</h4>
                                {history.some((h) => h.idrecette === recette.idrecette) ? (
                                    history
                                        .filter((h) => h.idrecette === recette.idrecette)
                                        .map((h) => (
                                            <div key={h.idrecette}>
                                                {h.historique.map((entry, index) => (
                                                    <div key={index}>
                                                        <p>Date: {entry.date}</p>
                                                        <ul>
                                                            {entry.ingredients.map((ingredient, idx) => (
                                                                <li key={idx}>
                                                                    {ingredient.nom} - {ingredient.quantite}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                ) : (
                                    <p>Pas d'historique disponible pour cette recette.</p>
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

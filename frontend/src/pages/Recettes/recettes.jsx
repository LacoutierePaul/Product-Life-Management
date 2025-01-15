import React, { useState, useEffect } from "react";
import "./recettes.css";
import { GetRecettesWithStocks } from "../../api/recettestostocks.js";
import { addProductionPlanifiee } from "../../api/production_planifiee.js";
import { checkStockForOrder, updateStockForOrder } from "../../api/stocks.js";
import { DeleteRecette } from "../../api/recettes.js";

const Recettes = () => {
    const [recettes, setRecettes] = useState([]); // Contient la liste des recettes
    const [expandedRecipeId, setExpandedRecipeId] = useState(null); // Stocke l'ID de la recette actuellement développé pour les ingrédients
    const [expandedHistoryId, setExpandedHistoryId] = useState(null); // Stocke l'ID de la recette actuellement développé pour l'historique
    const [quantiteCommande, setQuantiteCommande] = useState({}); // Stocke la quantité choisie pour chaque recette
    const [isCommandeInitiated, setIsCommandeInitiated] = useState(null); // Suivi si l'utilisateur a lancé la commande
    const [searchTerm, setSearchTerm] = useState(''); // State for search term


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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredRecettes = recettes.filter((recette) =>
        recette.nom_recette.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Fonction pour basculer l'affichage des ingrédients
    const toggleExpand = (id) => {
        setExpandedRecipeId(expandedRecipeId === id ? null : id);
    };

    // Fonction pour basculer l'affichage de l'historique
    const toggleExpandHistory = (id) => {
        setExpandedHistoryId(expandedHistoryId === id ? null : id);
    };

    const handleQuantiteChange = (id, quantite) => {
        setQuantiteCommande({
            ...quantiteCommande,
            [id]: quantite,
        });
    };

    const handleDeleteRecette = async (id) => {
        try {
            await DeleteRecette(id);
            setRecettes((prevRecettes) => prevRecettes.filter((recette) => recette.idrecette !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette :", error);
        }
    };



    // Fonction pour mettre à jour la quantité de commande
    const handlePasserCommande = async (id) => {
        const quantite = quantiteCommande[id];
        if (quantite && quantite > 0) {
            try {
                // Vérifier les stocks avant de passer la commande
                const stockCheckResult = await checkStockForOrder({
                    idrecette: id,
                    quantity: quantite,
                });

                if (!stockCheckResult.success) {
                    // Afficher une alerte si les stocks sont insuffisants
                    const insufficientStocks = stockCheckResult.insufficientStocks
                        .map((item) => `${item.ingredient}: requis ${item.required}, disponible ${item.available}`)
                        .join("\n");
                    alert(`Stock insuffisant pour certains ingrédients :\n${insufficientStocks}`);
                    return; // Arrêter si les stocks sont insuffisants
                }

                // Si les stocks sont suffisants, passer la commande
                await addProductionPlanifiee({
                    idrecette: id,
                    status: "Planifiée",
                    quantite_planifiee: quantite,
                });
                await updateStockForOrder({
                    idrecette: id,
                    quantity: quantite,
                });


                alert("Commande passée avec succès !");
                setIsCommandeInitiated(null); // Réinitialiser après la commande
            } catch (error) {
                console.error("Erreur lors de la vérification des stocks ou de la commande :", error);
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        } else {
            alert("Veuillez choisir une quantité valide.");
        }
    };


    return (
        <div className="recettes">
            <h2>Liste des Recettes</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher une recette par nom"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="recette-list">

                {filteredRecettes.map((recette) => (
                    <div key={recette.idrecette} className="recette-item">
                        <div className="recette-header">
                            <h3>{recette.nom_recette}</h3>
                            <p>{recette.description}</p>
                            <button onClick={() => toggleExpand(recette.idrecette)}>
                                {expandedRecipeId === recette.idrecette
                                    ? "Masquer les ingrédients"
                                    : "Voir les ingrédients"}
                            </button>
                            <button className="history-button" onClick={() => toggleExpandHistory(recette.idrecette)}>
                                {expandedHistoryId === recette.idrecette
                                    ? "Masquer l'historique"
                                    : "Voir l'historique"}
                            </button>
                            {/* Delete button */}
                            <button
                                className="btn-supprimer"
                                onClick={() => handleDeleteRecette(recette.idrecette)}
                            >
                                Supprimer
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

                        {/* Commande de production */}
                        <div className="commande">
                            {isCommandeInitiated === recette.idrecette ? (
                                <>
                                    <label>Quantité :</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantiteCommande[recette.idrecette] || 0}
                                        onChange={(e) =>
                                            handleQuantiteChange(recette.idrecette, parseInt(e.target.value, 10))
                                        }
                                    />
                                    <button onClick={() => handlePasserCommande(recette.idrecette)}>
                                        Valider la commande
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsCommandeInitiated(recette.idrecette)}>
                                    Passer la commande
                                </button>
                            )}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Recettes;

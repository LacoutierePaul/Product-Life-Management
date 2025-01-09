import { Stock } from "../models/stocks.model";
import { Recette } from "../models/recettes.model";

interface Commande {
    idrecette: number;
    quantity: number;
}

interface RecetteWithStocks {
    idrecette: number;
    nom_recette: string;
    description: string;
    Stocks: {
        idstock: number;
        nom_ingredient: string;
        quantite: number;
        RecetteToStocks: {
            quantite: number;
        };
    }[];
}

export async function checkStockForOrder(order: Commande) {
    try {
        const insufficientStocks: {
            ingredient: string;
            required: number;
            available: number;
        }[] = [];

        // Récupérer la recette avec les stocks associés et la quantité requise de RecetteToStocks
        const recetteWithStocks = await Recette.findByPk(order.idrecette, {
            attributes: ["idrecette", "nom_recette", "description"],
            include: [
                {
                    model: Stock,
                    attributes: ["idstock", "nom_ingredient", "quantite"],
                    through: {
                        attributes: ["quantite"],
                    },
                },
            ],
        });

        if (!recetteWithStocks) {
            throw new Error(`La recette avec l'id ${order.idrecette} n'existe pas.`);
        }

        // Convertir le résultat en JSON pour une manipulation simplifiée
        const recetteJSON = recetteWithStocks.toJSON() as RecetteWithStocks;

        // Parcourir les stocks associés
        for (const stock of recetteJSON.Stocks) {
            const availableQuantity = stock.quantite; // Quantité actuelle en stock
            console.log("availablequantity", availableQuantity)
            const requiredQuantity = stock.RecetteToStocks.quantite * order.quantity; // Quantité nécessaire pour la commande
            console.log("requiredQuantity", stock.RecetteToStocks.quantite, order.quantity)

            if (availableQuantity < requiredQuantity) {
                console.log("Hello")
                insufficientStocks.push({
                    ingredient: stock.nom_ingredient,
                    required: requiredQuantity,
                    available: availableQuantity,
                });
            }
        }

        // Vérifier si des stocks sont insuffisants
        if (insufficientStocks.length > 0) {
            return { success: false, insufficientStocks };
        }

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la vérification des stocks :", error);
        throw error;
    }
}
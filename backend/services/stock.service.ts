import { RecetteToStocks } from "../models/recettetostock.model";
import { Stock } from "../models/stocks.model";

interface Commande {
    idrecette: number;
    quantity: number;
}

export async function checkStockForOrder(order: Commande) {
    try {
        const insufficientStocks: {
            ingredient: string;
            required: number;
            available: number;
        }[] = [];

        const recetteIngredients = await RecetteToStocks.findAll({
            where: { idrecette: order.idrecette },
            include: [Stock], // Inclure les détails du stock
        });

        for (const recetteIngredient of recetteIngredients) {
            const stock = recetteIngredient.Stocks.quantite;

            const requiredQuantity = recetteIngredient.quantite * order.quantite;
            if (stock < requiredQuantity) {
                insufficientStocks.push({
                    ingredient: stock.nom_ingredient,
                    required: requiredQuantity,
                    available: stock.quantite,
                });
            }
        }

        if (insufficientStocks.length > 0) {
            return { success: false, insufficientStocks };
        }

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la vérification des stocks :", error);
        throw error;
    }
}

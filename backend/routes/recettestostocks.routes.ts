import express, { Request, Response } from "express";
import { Recette } from "../models/recettes.model";
import { Stock } from "../models/stocks.model"
import { checkStockForOrder } from "../services/stock.service";

const router = express.Router();

// Route pour obtenir toutes les recettes avec leurs ingrédients
router.get("/", async (req: Request, res: Response) => {
    try {
        const recettes = await Recette.findAll({
            include: [
                {
                    model: Stock,
                    through: { attributes: ["quantite"] }, // Exclure les id dans RecetteToStock
                },
            ],
        });
        res.json(recettes);
    } catch (error) {
        console.error("Erreur dans la route /withStocks :", error);
        res.status(500).json({ error: "Unable to fetch recipes" });
    }
});

// Route pour obtenir une unique recette avec ses ingrédients
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const recetteWithStocks = await Recette.findByPk(id, {
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

        if (recetteWithStocks) {
            res.json(recetteWithStocks);
        } else {
            res.status(404).json({ error: "Recette not found" });
        }
    } catch (error) {
        console.error("Erreur dans la route /withStocks :", error);
        res.status(500).json({ error: "Unable to fetch recipes" });
    }
});

//Route to check if there is enough stock for an order
router.get("/CheckStockForOrder", async (req: Request, res: Response) => {
    try {
        const commande = req.body;
        console.log(commande)
        const result = await checkStockForOrder(commande);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Something Went Wrong" });
    }
});

export default router;
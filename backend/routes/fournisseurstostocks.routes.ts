import express, { Request, Response } from "express";
import { Fournisseur } from "../models/fournisseur.model";
import { Stock } from "../models/stocks.model"
import { FournisseursToStocks } from "../models/fournisseurstostocks.model";

const router = express.Router();

// Route pour obtenir toutes les recettes avec leurs ingrédients
router.get("/", async (req: Request, res: Response) => {
    try {
        const fournisseurs = await Fournisseur.findAll({
            include: [
                {
                    model: Stock,
                    through: { attributes: [] },
                },
            ],
        });
        res.json(fournisseurs);
    } catch (error) {
        console.error("Erreur dans la route :", error);
        res.status(500).json({ error: "Unable to fetch recipes" });
    }
});

// Route pour obtenir un unique fournisseur avec ses stocks proposés
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const fournisseursWithStocks = await Fournisseur.findByPk(id, {
            include: [
                {
                    model: Stock,
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        if (fournisseursWithStocks) {
            res.json(fournisseursWithStocks);
        } else {
            res.status(404).json({ error: "Recette not found" });
        }
    } catch (error) {
        console.error("Erreur dans la route /withStocks :", error);
        res.status(500).json({ error: "Unable to fetch recipes" });
    }
});

export default router;
import express, { Request, Response } from "express";
import { Fournisseur } from "../models/fournisseur.model";
import { Stock } from "../models/stocks.model"
import {Recette} from "../models/recettes.model";

const router = express.Router();

// Route pour obtenir tous les stocks avec leur fournisseurs possibles
router.get("/", async (req: Request, res: Response) => {
    try {
        const stocks = await Stock.findAll({
            include: [
                {
                    model: Fournisseur,
                    through: { attributes: [] },
                },
            ],
        });
        res.json(stocks);
    } catch (error) {
        console.error("Erreur dans la route :", error);
        res.status(500).json({ error: "Unable to fetch stocks" });
    }
});

// Route pour obtenir un unique stocks avec tous ses fournisseurs proposés
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const stocksWithFournisseur = await Stock.findByPk(id, {
            attributes: ["idstock", "nom_ingredient", "quantite", "seuil_minimal", "unite"],
            include: [
                {
                    model: Fournisseur,
                    attributes: ["idfournisseur", "nom_fournisseur", "contact", "evaluation", "commentaire"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        if (stocksWithFournisseur) {
            res.json(stocksWithFournisseur);
        } else {
            res.status(404).json({ error: "Stocks not found" });
        }
    } catch (error) {
        console.error("Erreur dans la route /fournisseurstostocks :", error);
        res.status(500).json({ error: "Unable to fetch stocks" });
    }
});

export default router;
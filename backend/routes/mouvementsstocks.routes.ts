import express, { Request, Response } from "express";
import { MouvementStock } from "../models/mouvementstocks.model";

const router = express.Router();

// Obtenir tous les mouvementStocks
router.get("/", async (req: Request, res: Response) => {
    try {
        const mouvementStocks = await MouvementStock.findAll();
        res.json(mouvementStocks);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch mouvementStocks" });
    }
});

// Ajouter un mouvementStocks
router.post("/", async (req: Request, res: Response) => {
    try {
        const mouvementStock = await MouvementStock.create(req.body);
        res.status(201).json(mouvementStock);
    } catch (err) {
        res.status(500).json({ error: "Unable to create mouvementStocks" });
    }
});

// Mettre à jour un mouvement Stock
router.put("/:idmouvement", async (req: Request, res: Response) => {
    try {
        const { idmouvement } = req.params;
        const [updated] = await MouvementStock.update(req.body, { where: { idmouvement } });

        if (updated) {
            const updatedMouv = await MouvementStock.findByPk(idmouvement);
            res.json(updatedMouv);
        } else {
            res.status(404).json({ error: "Mouvement stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update Mouvement stock" });
    }
});

// Supprimer un MouvementStock
router.delete("/:idmouvement", async (req: Request, res: Response) => {
    try {
        const { idmouvement } = req.params;
        const deleted = await MouvementStock.destroy({ where: { idmouvement } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Mouvement Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete mouvement Stock" });
    }
});

export default router;
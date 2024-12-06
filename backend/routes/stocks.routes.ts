import express, { Request, Response } from "express";
import { Stock } from "../models/stocks.model";

const router = express.Router();

// Obtenir tous les stocks
router.get("/", async (req: Request, res: Response) => {
    try {
        const stocks = await Stock.findAll();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch stocks" });
    }
});

// Ajouter un stock
router.post("/", async (req: Request, res: Response) => {
    try {
        const stock = await Stock.create(req.body);
        res.status(201).json(stock);
    } catch (err) {
        res.status(500).json({ error: "Unable to create stock" });
    }
});

// Mettre à jour un stock
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Stock.update(req.body, { where: { id } });

        if (updated) {
            const updatedStock = await Stock.findByPk(id);
            res.json(updatedStock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update stock" });
    }
});

// Supprimer un stock
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Stock.destroy({ where: { id } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete stock" });
    }
});

export default router;
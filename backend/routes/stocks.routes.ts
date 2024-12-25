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
router.put("/:idstock", async (req: Request, res: Response) => {
    try {
        const { idstock } = req.params;
        const [updated] = await Stock.update(req.body, { where: { idstock } });

        if (updated) {
            const updatedStock = await Stock.findByPk(idstock);
            res.json(updatedStock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update stock" });
    }
});

// Supprimer un stock
router.delete("/:idstock", async (req: Request, res: Response) => {
    try {
        const { idstock } = req.params;
        const deleted = await Stock.destroy({ where: { idstock } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete stock" });
    }
});


// Obtenir un stock par ID
router.get("/:id", async (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        const stock = await Stock.findByPk(id);
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch stock" });
    }
}
);

//Ajouter une quantité à un stock
router.get("/add/:id/:quantity", async (req: Request, res: Response) => {
    try {
        const { id, quantity } = req.params;
        const stock = await Stock.findByPk(id);
        if (stock) {
            stock.quantite += parseInt(quantity);
            await stock.save();
            res.json(stock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch stock" });
    }
});

//Retirer une quantité à un stock
router.get("/remove/:id/:quantity", async (req: Request, res: Response) => {
    try {
        const { id, quantity } = req.params;
        const stock = await Stock.findByPk(id);
        if (stock) {
            stock.quantite -= parseInt(quantity);
            await stock.save();
            res.json(stock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch stock" });
    }
});


export default router;
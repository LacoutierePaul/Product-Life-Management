import express, { Request, Response } from "express";
import { Recette } from "../models/recettes.model";

const router = express.Router();

// Obtenir toutes les recettes
router.get("/", async (req: Request, res: Response) => {
    try {
        const recettes = await Recette.findAll({
            order: [
                ['nom_recette', 'ASC'],
            ],
        });
        res.json(recettes);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch recipies" });
    }
});

// Ajouter une recette
router.post("/", async (req: Request, res: Response) => {
    try {
        const recette = await Recette.create(req.body);
        res.status(201).json(recette);
    } catch (err) {
        res.status(500).json({ error: "Unable to create recipy" });
    }
});

// Mettre à jour une recette
router.put("/:idrecette", async (req: Request, res: Response) => {
    try {
        const { idrecette } = req.params;
        const [updated] = await Recette.update(req.body, { where: { idrecette } });

        if (updated) {
            const updatedRecette = await Recette.findByPk(idrecette);
            res.json(updatedRecette);
        } else {
            res.status(404).json({ error: "Recipy not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update recipy" });
    }
});

// Supprimer une recette
router.delete("/:idrecette", async (req: Request, res: Response) => {
    try {
        const { idrecette } = req.params;
        const deleted = await Recette.destroy({ where: { idrecette } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Recipy not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete recipy" });
    }
});

export default router;
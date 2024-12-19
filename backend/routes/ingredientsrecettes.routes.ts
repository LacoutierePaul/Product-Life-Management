import express, { Request, Response } from "express";
import { IngredientRecette } from "../models/recettetostock.model";

const router = express.Router();

// Obtenir tous les Ingredients de Recettes
router.get("/", async (req: Request, res: Response) => {
    try {
        const IngredientsRecette = await IngredientRecette.findAll();
        res.json(IngredientsRecette);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch IngredientsRecette" });
    }
});

// Ajouter un IngredientRecette
router.post("/", async (req: Request, res: Response) => {
    try {
        const IngredientRecette = await IngredientRecette.create(req.body);
        res.status(201).json(IngredientRecette);
    } catch (err) {
        res.status(500).json({ error: "Unable to create IngredientRecette" });
    }
});

// Mettre à jour un IngredientRecette
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await IngredientRecette.update(req.body, { where: { id } });

        if (updated) {
            const updatedFournisseur = await IngredientRecette.findByPk(id);
            res.json(updatedFournisseur);
        } else {
            res.status(404).json({ error: "IngredientRecette not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update IngredientRecette" });
    }
});

// Supprimer un IngredientRecette
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await IngredientRecette.destroy({ where: { id } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "IngredientRecette not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete IngredientRecette" });
    }
});

// Obtenir un IngredientRecette par ID
router.get("/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const IngredientRecette = await IngredientRecette.findByPk(id);
            if (IngredientRecette) {
                res.json(IngredientRecette);
            } else {
                res.status(404).json({ error: "IngredientRecette not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "Unable to fetch IngredientRecette" });
        }
    }
);

export default router;
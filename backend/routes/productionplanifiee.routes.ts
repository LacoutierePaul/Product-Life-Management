import express, { Request, Response } from "express";
import { ProductionPlanifiee } from "../models/productionplanifiee.model";
import {Recette} from "../models/recettes.model";
import {Stock} from "../models/stocks.model";

const router = express.Router();

// Obtenir toutes les productions planifiée
router.get("/", async (req: Request, res: Response) => {
    try {
        const commandesRecette = await ProductionPlanifiee.findAll({
            attributes: ["idproductionplanifiee", "quantite_planifiee", "status", "createdAt"],
            include: [
                {
                    model: Recette,
                    attributes: ["idrecette", "nom_recette", "description"],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        res.json(commandesRecette);
    } catch (error) {
        console.error("Erreur dans la route /production_planifiee :", error);
        res.status(500).json({ error: "Unable to fetch commandesrecettes" });
    }
});

// Ajouter une production planifiée
router.post("/", async (req: Request, res: Response) => {
    try {
        const productionPlanifiee = await ProductionPlanifiee.create(req.body);
        res.status(201).json(productionPlanifiee);
    } catch (err) {
        res.status(500).json({ error: "Unable to create productionPlanifiee" });
    }
});

// Mettre à jour une production planifiée
router.put("/:idproductionplanifiee", async (req: Request, res: Response) => {
    try {
        const { idproductionplanifiee } = req.params;
        const [updated] = await ProductionPlanifiee.update(req.body, { where: { idproductionplanifiee } });

        if (updated) {
            const updatedProd = await ProductionPlanifiee.findByPk(idproductionplanifiee);
            res.json(updatedProd);
        } else {
            res.status(404).json({ error: "ProductionPlanifiee not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update ProductionPlanifiee" });
    }
});

// Supprimer une production planifiée
router.delete("/:idproductionplanifiee", async (req: Request, res: Response) => {
    try {
        const { idproductionplanifiee } = req.params;
        const deleted = await ProductionPlanifiee.destroy({ where: { idproductionplanifiee } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Production planifiee not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete production planifiee" });
    }
});

export default router;
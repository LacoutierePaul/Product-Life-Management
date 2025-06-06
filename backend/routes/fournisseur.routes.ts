import express, { Request, Response } from "express";
import { Fournisseur } from "../models/fournisseur.model";

const router = express.Router();

// Obtenir tous les fournisseurs
router.get("/", async (req: Request, res: Response) => {
    try {
        const fournisseurs = await Fournisseur.findAll({
            order: [
                ['nom_fournisseur', 'ASC'],
            ],
        });
        res.json(fournisseurs);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch fournisseurs" });
    }
});

// Ajouter un fournisseur
router.post("/", async (req: Request, res: Response) => {
    try {
        const fournisseur = await Fournisseur.create(req.body);
        res.status(201).json(fournisseur);
    } catch (err) {
        res.status(500).json({ error: "Unable to create fournisseur" });
    }
});

// Mettre à jour un fournisseur
router.put("/:idfournisseur", async (req: Request, res: Response) => {
    try {
        const { idfournisseur } = req.params;
        const [updated] = await Fournisseur.update(req.body, { where: { idfournisseur } });

        if (updated) {
            const updatedFournisseur = await Fournisseur.findByPk(idfournisseur);
            res.json(updatedFournisseur);
        } else {
            res.status(404).json({ error: "Fournisseur not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update fournisseur" });
    }
});

// Supprimer un fournisseur
router.delete("/:idfournisseur", async (req: Request, res: Response) => {
    try {
        const { idfournisseur } = req.params;
        const deleted = await Fournisseur.destroy({ where: { idfournisseur } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Fournisseur not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete fournisseur" });
    }
});


// Obtenir un fournisseur par ID
router.get("/:idfournisseur", async (req: Request, res: Response) => {
    try {
        const { idfournisseur } = req.params;
        const fournisseur = await Fournisseur.findByPk(idfournisseur);

        if (fournisseur) {
            res.json(fournisseur);
        } else {
            res.status(404).json({ error: "Fournisseur not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch fournisseur" });
    }
});

export default router;
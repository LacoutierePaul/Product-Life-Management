import express, { Request, Response } from "express";
import { ControleQualite } from "../models/controlequalite.model";

const router = express.Router();

// Obtenir toutes les controles qualites
router.get("/", async (req: Request, res: Response) => {
    try {
        const controleQualites = await ControleQualite.findAll();
        res.json(controleQualites);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch controleQualites" });
    }
});

// Ajouter une controle qualite
router.post("/", async (req: Request, res: Response) => {
    try {
        const controleQualite = await ControleQualite.create(req.body);
        res.status(201).json(controleQualite);
    } catch (err) {
        res.status(500).json({ error: "Unable to create controle qualite" });
    }
});

// Mettre à jour un controle qualite
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await ControleQualite.update(req.body, { where: { id } });

        if (updated) {
            const updatedControle = await ControleQualite.findByPk(id);
            res.json(updatedControle);
        } else {
            res.status(404).json({ error: "Controle Qualite not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update Controle qualite" });
    }
});

// Supprimer un controle qualite
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await ControleQualite.destroy({ where: { id } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Controle qualite not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete controle qualite" });
    }
});

export default router;
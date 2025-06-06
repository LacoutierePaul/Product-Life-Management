import express, { Request, Response } from "express";
import { CommandeIngredients } from "../models/commandeingredients.model";
import {Stock} from "../models/stocks.model";

const router = express.Router();

// Obtenir toutes les commandes d'ingrédients
router.get("/", async (req: Request, res: Response) => {
    try {
        const commandesIngredient = await CommandeIngredients.findAll({
            attributes: ["idcommande", "idstock", "idfournisseur", "quantite_commande", "statut_commande", "createdAt"],
            include: [
                {
                    model: Stock,
                    attributes: ["nom_ingredient", "unite", "quantite", "seuil_minimal"],
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        res.json(commandesIngredient);
    } catch (error) {
        console.error("Erreur dans la route /commandesstocks :", error);
        res.status(500).json({ error: "Unable to fetch commandesIngredient" });
    }
});

// Ajouter une commande d'ingrédient
router.post("/", async (req: Request, res: Response) => {
    try {
        const commandeIngredients = await CommandeIngredients.create(req.body);
        res.status(201).json(commandeIngredients);
    } catch (err) {
        res.status(500).json({ error: "Unable to create commandeIngredients" });
    }
});

// Mettre à jour une commande Ingredients
router.put("/:idcommande", async (req: Request, res: Response) => {
    try {
        const { idcommande } = req.params;
        const [updated] = await CommandeIngredients.update(req.body, { where: { idcommande } });

        if (updated) {
            const updatedCommande = await CommandeIngredients.findByPk(idcommande);
            res.json(updatedCommande);
        } else {
            res.status(404).json({ error: "Commande Ingrédient not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update Commande Ingrédient" });
    }
});

// Supprimer une commande Ingrédient
router.delete("/:idcommande", async (req: Request, res: Response) => {
    try {
        const { idcommande} = req.params;
        const deleted = await CommandeIngredients.destroy({ where: { idcommande } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Commande Ingrédient not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete commande Ingrédient" });
    }
});

export default router;
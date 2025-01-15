import express, { Request, Response } from "express";
import { User } from "../models/user.model";

const router = express.Router();

// Obtenir tous les users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [
                ['email_user', 'ASC'],
            ],
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch users" });
    }
});

// Ajouter un user
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Unable to create user" });
    }
});

// Mettre à jour un user
router.put("/:iduser", async (req: Request, res: Response) => {
    try {
        const { iduser } = req.params;
        const [updated] = await User.update(req.body, { where: { iduser } });

        if (updated) {
            const updatedUser = await User.findByPk(iduser);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to update user" });
    }
});

// Supprimer un user
router.delete("/:iduser", async (req: Request, res: Response) => {
    try {
        const { iduser } = req.params;
        const deleted = await User.destroy({ where: { iduser } });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to delete user" });
    }
});


// Obtenir un user par ID
router.get("/:iduser", async (req: Request, res: Response) => {
    try {
        const { iduser } = req.params;
        const user = await User.findByPk(iduser);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch user" });
    }
});

export default router;
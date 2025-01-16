import express, { Request, Response } from "express";
import { User } from "../models/user.model";

const router = express.Router();

// Route de connexion
router.post('/login', async (req , res) => {
    const { email_user, password_user } = req.body;
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({
            where: {
                email_user: email_user,
                password_user: password_user
            }
        });

        console.log("user :", user)
        // Vérification si l'utilisateur est trouvé
        if (!user) {
            res.status(401).json({ message: 'Identifiants incorrects' });
            return;
        }

        // Si l'utilisateur est trouvé, enregistrer dans la session
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user = {
                iduser: user.iduser,
                prenom_user: user.prenom_user,
                nom_user: user.nom_user,
                email_user: user.email_user,
                password_user: user.password_user,
                admin_role: user.admin_role,
                readonly_role: user.readonly_role,
                edit_role: user.edit_role,
                delete_role: user.delete_role
            };

            // Réponse de succès
            res.json({ user: req.session.user, message: 'You are now logged in!' });
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Route pour déconnexion
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Déconnexion réussie' });
    });
});

export default router;
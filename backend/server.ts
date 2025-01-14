import express, { Request, Response, json } from "express";
import cors from "cors";
import sequelize from "./config/database";
import stockRoutes from "./routes/stocks.routes";
import recettesRoutes from "./routes/recettes.routes";
import fournisseurRoutes from "./routes/fournisseur.routes";
import controlequaliteRoutes from "./routes/controlequalite.routes";
import mouvementsstocksRoutes from "./routes/mouvementsstocks.routes";
import productionplanifieeRoutes from "./routes/productionplanifiee.routes";
import defineRelations from "./models/relations.model";
import recettestostocksRoutes from "./routes/recettestostocks.routes";
import commande_ingredientsRoutes from "./routes/commande_ingredients.routes";
import fournisseurstostocksRoutes from "./routes/fournisseurstostocks.routes";

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());

app.use("/stocks", stockRoutes);
app.use("/recettes", recettesRoutes);
app.use("/fournisseurs", fournisseurRoutes);
app.use("/controlequalite", controlequaliteRoutes);
app.use("/mouvementsstocks", mouvementsstocksRoutes);
app.use("/production_planifiee", productionplanifieeRoutes);
app.use("/recettestostocks", recettestostocksRoutes)
app.use("/commandesstocks", commande_ingredientsRoutes)
app.use("/fournisseurstostocks", fournisseurstostocksRoutes)

// Test API de base
app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

// Définir les relations entre les tables
defineRelations()

// Synchroniser avec la base de données et démarrer le serveur
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected successfully.");
        return sequelize.sync(); // Synchronise les modèles avec la base
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

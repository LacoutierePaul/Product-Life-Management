import { Recette } from "./recettes.model";
import { Stock } from "./stocks.model";
import { ControleQualite } from "./controlequalite.model";
import { ProductionPlanifiee } from "./productionplanifiee.model";
import { RecetteToStocks } from "./recettetostock.model";
import { MouvementStock } from "./mouvementstocks.model";
import { Fournisseur } from "./fournisseur.model";
import { FournisseursToStocks } from "./fournisseurstostocks.model";

// Définition des relations
ProductionPlanifiee.belongsTo(Recette, {
    foreignKey: "idrecette",
    onDelete: "CASCADE",
});
Recette.hasMany(ProductionPlanifiee, {
    foreignKey: "idrecette",
});

ProductionPlanifiee.belongsTo(ControleQualite, {
    foreignKey: "idcontrole",
    onDelete: "CASCADE",
});
ControleQualite.hasMany(ProductionPlanifiee, {
    foreignKey: "idcontrole",
});

// **2. RecetteToStocks**
Recette.belongsToMany(Stock, {
    through: RecetteToStocks,
    foreignKey: "idrecette",
});
Stock.belongsToMany(Recette, {
    through: RecetteToStocks,
    foreignKey: "idstock",
});

// **3. MouvementStocks**
MouvementStock.belongsTo(Stock, {
    foreignKey: "idstock",
    onDelete: "CASCADE",
});
Stock.hasMany(MouvementStock, {
    foreignKey: "idstock",
});

// **4. FournisseurToStocks**
Fournisseur.belongsToMany(Stock, {
    through: FournisseursToStocks,
    foreignKey: "idfournisseur",
});
Stock.belongsToMany(Fournisseur, {
    through: FournisseursToStocks,
    foreignKey: "idstock",
});
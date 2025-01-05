import { Recette } from "./recettes.model";
import { Stock } from "./stocks.model";
import { ControleQualite } from "./controlequalite.model";
import { ProductionPlanifiee } from "./productionplanifiee.model";
import { RecetteToStocks } from "./recettetostock.model";
import { MouvementStock } from "./mouvementstocks.model";
import { Fournisseur } from "./fournisseur.model";
import { FournisseursToStocks } from "./fournisseurstostocks.model";

export default function defineRelations() {

// Définition des relations
    ProductionPlanifiee.belongsTo(Recette, {
        foreignKey: "idrecette",
        onDelete: "CASCADE",
    });
    Recette.hasMany(ProductionPlanifiee, {
        foreignKey: "idrecette",
    });

    ControleQualite.belongsTo(ProductionPlanifiee, {
        foreignKey: "idproductionplanifiee",
        onDelete: "CASCADE",
    });
    ProductionPlanifiee.hasMany(ControleQualite, {
        foreignKey: "idproductionplanifiee",
    });

// **2. RecetteToStocks**
    Recette.belongsToMany(Stock, {
        through: RecetteToStocks,
        foreignKey: "idrecette",
        otherKey: "idstock"
    });
    Stock.belongsToMany(Recette, {
        through: RecetteToStocks,
        foreignKey: "idstock",
        otherKey: "idrecette"
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
}
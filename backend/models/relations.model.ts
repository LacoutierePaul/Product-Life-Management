import { Fournisseur } from "./fournisseur.model";
import { Stock } from "./stocks.model";
import { MouvementStock } from "./mouvementstocks.model";
import { ControleQualite } from "./controlequalite.model";
import { IngredientRecette } from "./ingredientsrecettes.model";

// Relations
MouvementStock.belongsTo(Stock, { foreignKey: "idStock" });
ControleQualite.belongsTo(Fournisseur, { foreignKey: "idProduction" });
IngredientRecette.belongsTo(Fournisseur, { foreignKey: "idFournisseur" });
IngredientRecette.belongsTo(Fournisseur, { foreignKey: "idRecette" });
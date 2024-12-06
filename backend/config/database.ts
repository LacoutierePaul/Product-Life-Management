import { Sequelize } from 'sequelize';
import { Fournisseur } from '../models/fournisseur.model';
import { Stock } from '../models/stocks.model';
import { MouvementStock } from '../models/mouvementstocks.model';
import { ProductionPlanifiee } from '../models/productionplanifiee.model';
import { ControleQualite } from '../models/controlequalite.model';
import { Recette } from '../models/recettes.model';
import { IngredientRecette } from '../models/ingredientsrecettes.model';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
});

export default sequelize;
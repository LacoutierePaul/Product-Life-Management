import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


interface IngredientRecetteInterface {
    id: number;
    idRecette: number;
    idFournisseur: number;
    nom_ingredient: string;
    quantite: number;
    unite: string;
}

export class IngredientRecette extends Model <IngredientRecetteInterface>{
    public id!: number;
    public idRecette!: number;
    public idFournisseur!: number;
    public nom_ingredient!: string;
    public quantite!: number;
    public unite!: string;
}

IngredientRecette.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        idRecette: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "recettes",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        idFournisseur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "fournisseurs",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        nom_ingredient: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        quantite: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unite: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "IngredientRecette",
        tableName: "ingredients_recette",
        schema: "public",
        timestamps: false,
    }
);
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface RecetteInterface {
    idrecette: number;
    nom_recette: string;
    description: string;
}
export class Recette extends Model <RecetteInterface> {
    public idrecette!: number;
    public nom_recette!: string;
    public description!: string;
}

Recette.init(
    {
        idrecette: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom_recette: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.TEXT,
        } 
    },
    {
        sequelize,
        modelName: 'Recette',
        tableName: 'recettes',
        schema: 'public',
        timestamps: true,
    }
);
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface RecetteInterface {
    id: number;
    nom: string;
    description: string;
}
export class Recette extends Model <RecetteInterface> {
    public id!: number;
    public nom!: string;
    public description!: string;
}

Recette.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom: {
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
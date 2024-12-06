import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Recette extends Model {}
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
        },
        dateCreation: {
            type: DataTypes.DATE,
        },
        seuilMinimal: {
            type: DataTypes.INTEGER,
        },
        unite: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'Recette',
        tableName: 'recette',
        schema: 'plm',
        timestamps: true,
    }
);
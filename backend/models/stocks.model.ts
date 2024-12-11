import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Stock extends Model {}
Stock.init(
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
        type: {
            type: DataTypes.STRING(50),
        },
        quantite: {
            type: DataTypes.INTEGER,
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
        modelName: 'Stock',
        tableName: 'stocks',
        schema: 'public',
        timestamps: true,
    }
);
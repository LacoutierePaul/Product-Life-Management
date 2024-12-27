import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface RecetteToStocksAttributes {
    idstock: number;
    idrecette: number;
}

export class RecetteToStocks extends Model<RecetteToStocksAttributes> {
    public idstock!: number;
    public idrecette!: number;
}

RecetteToStocks.init(
    {
        idstock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "stocks",
                key: "idstock",
            },
            onDelete: "CASCADE",
        },
        idrecette: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "recettes",
                key: "idrecette",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        modelName: "RecetteToStocks",
        tableName: "recette_to_stocks",
        schema: "public",
        timestamps: true,
    }
);
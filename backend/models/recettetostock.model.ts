import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface RecetteToStocksAttributes {
    idstock: number;
    idrecette: number;
    quantite: number;
}

export class RecetteToStocks extends Model<RecetteToStocksAttributes> {
    public idstock!: number;
    public idrecette!: number;
    public quantite!: number;
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
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
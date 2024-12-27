import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface FournisseursToStocksAttributes {
    idstock: number;
    idfournisseur: number;
}

export class FournisseursToStocks extends Model<FournisseursToStocksAttributes> {
    public idstock!: number;
    public idfournisseur!: number;
}

FournisseursToStocks.init(
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
        idfournisseur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "fournisseurs",
                key: "idfournisseur",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        modelName: "FournisseursToStocks",
        tableName: "fournisseurs_to_stocks",
        schema: "public",
        timestamps: true,
    }
);
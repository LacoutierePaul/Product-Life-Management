import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class MouvementStock extends Model {}

MouvementStock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        idStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "stocks",
                key: "id",
            },
        },
        typeMouvement: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateMouvement: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        raison: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "MouvementStock",
        tableName: "mouvements_stock",
        schema: "plm",
        timestamps: false,
    }
);
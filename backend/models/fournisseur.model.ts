import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class Fournisseur extends Model {}

Fournisseur.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        matierePremiere: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dateDerniereLivraison: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        evaluation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        commentaires: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Fournisseur",
        tableName: "fournisseurs",
        schema: "public",
        timestamps: false,
    }
);
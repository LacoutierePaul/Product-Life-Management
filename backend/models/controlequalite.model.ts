import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class ControleQualite extends Model {}

ControleQualite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        idProduction: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "production_planifiee",
                key: "id",
            },
        },
        dateControle: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        resultat: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        commentaire: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ControleQualite",
        tableName: "controle_qualite",
        schema: "plm",
        timestamps: false,
    }
);
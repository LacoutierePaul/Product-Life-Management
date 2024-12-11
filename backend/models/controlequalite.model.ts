import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


interface ControleQualiteInterface {
    id: number;
    idProduction: number;
    dateControle: Date;
    resultat: string;
    commentaire: string;
}

export class ControleQualite extends Model <ControleQualiteInterface> {
    public id!: number;
    public idProduction!: number;
    public dateControle!: Date;
    public resultat!: string;
    public commentaire!: string;
}

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
        schema: "public",
        timestamps: false,
    }
);
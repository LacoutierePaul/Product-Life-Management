import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


interface ControleQualiteInterface {
    idcontrole: number;
    date_controle: Date;
    resultat: string;
    commentaire_controle: string;
    idproductionplanifiee: number;
}

export class ControleQualite extends Model <ControleQualiteInterface> {
    public idcontrole!: number;
    public date_controle!: Date;
    public resultat!: string;
    public commentaire_controle!: string;
    public idproductionplanifiee!: number;
}

ControleQualite.init(
    {
        idcontrole: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date_controle: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        resultat: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        commentaire_controle: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        idproductionplanifiee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "production_planifiee",
                key: "id",
            },
        }
    },
    {
        sequelize,
        modelName: "ControleQualite",
        tableName: "controle_qualite",
        schema: "public",
        timestamps: true,
    }
);
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


interface FournisseurInterface {
    id: number;
    nom: string;
    contact: string;
    matierePremiere: string;
    dateDerniereLivraison: Date;
    evaluation: number;
    commentaires: string;
}
export class Fournisseur extends Model <FournisseurInterface>{
    public id!: number;
    public nom!: string;
    public contact!: string;
    public matierePremiere!: string;
    public dateDerniereLivraison!: Date;
    public evaluation!: number;
    public commentaires!: string;
}

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
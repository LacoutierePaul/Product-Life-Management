import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";


interface FournisseurInterface {
    idfournisseur: number;
    nom_fournisseur: string;
    contact: string;
    evaluation: number;
    commentaire: string;
}
export class Fournisseur extends Model <FournisseurInterface>{
    public idfournisseur!: number;
    public nom_fournisseur!: string;
    public contact!: string;
    public evaluation!: number;
    public commentaire!: string;
}

Fournisseur.init(
    {
        idfournisseur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom_fournisseur: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        evaluation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        commentaire: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Fournisseur",
        tableName: "fournisseurs",
        schema: "public",
        timestamps: true,
    }
);
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface CommandeIngredientsInterface {
    idcommande: number;
    idstock: number;
    idfournisseur: number;
    quantite_commande: number;
    date_livraison: Date;
    date_commande: Date;
    status_commande: string;
}

export class CommandeIngredients extends Model <CommandeIngredientsInterface> {
    public idcommande!: number;
    public idstock!: number;
    public idfournisseur!: number;
    public quantite_commande!: number;
    public date_livraison!: Date;
    public date_commande!: Date;
    public status_commande!: string;
}


CommandeIngredients.init(
    {
        idcommande: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        idstock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "stocks",
                key: "idstock",
            },
        },
        idfournisseur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "fournisseurs",
                key: "idfournisseur",
            },
        },
        quantite_commande: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_livraison: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_commande: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status_commande: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "CommandeIngredients",
        tableName: "commande_ingredients",
        schema: "public",
        timestamps: true,
    }
);
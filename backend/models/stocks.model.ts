import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface StockInterface {
    id: number;
    nom: string;
    type: string;
    quantite: number;
    seuil_minimal: number;
    unite: string;
}

export class Stock extends Model<StockInterface> {
    public id!: number;
    public nom!: string;
    public type!: string;
    public quantite!: number;
    public seuil_minimal!: number;
    public unite!: string;
}


Stock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING(255),
        },
        type: {
            type: DataTypes.STRING(50),
        },
        quantite: {
            type: DataTypes.INTEGER,
        },
        seuil_minimal: {
            type: DataTypes.INTEGER,
        },
        unite: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'Stock',
        tableName: 'stocks',
        schema: 'public',
        timestamps: false,
    }
);




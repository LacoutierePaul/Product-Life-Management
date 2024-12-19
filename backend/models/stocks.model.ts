import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface StockInterface {
    idstock: number;
    nom_ingredient: string;
    quantite: number;
    seuil_minimal: number;
    unite: string;
}

export class Stock extends Model<StockInterface> {
    public idstock!: number;
    public nom_ingredient!: string;
    public quantite!: number;
    public seuil_minimal!: number;
    public unite!: string;
}


Stock.init(
    {
        idstock: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nom_ingredient: {
            type: DataTypes.STRING(255),
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
        timestamps: true,
    }
);




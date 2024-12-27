import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface MouvementStockInterface {
    idmouvement: number;
    idstock: number;
    type_mouvement: string;
    quantite_moved: number;
    raison: string;
}
export class MouvementStock extends Model<MouvementStockInterface> {
    public idmouvement!: number;
    public idstock!: number;
    public type_mouvement!: string;
    public quantite_moved!: number;
    public raison!: string;
}

MouvementStock.init(
    {
        idmouvement: {
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
        type_mouvement: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        quantite_moved: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        schema: "public",
        timestamps: true,
    }
);
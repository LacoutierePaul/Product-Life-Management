import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class ProductionPlanifiee extends Model {}
ProductionPlanifiee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        produitFini: {
            type: DataTypes.STRING(255),
        },
        quantitePlanifiee: {
            type: DataTypes.INTEGER,
        },
        dateProduction: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'ProductionPlanifiee',
        tableName: 'production_planifiee',
        schema: 'public',
        timestamps: true,
    }
);
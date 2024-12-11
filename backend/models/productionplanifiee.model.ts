import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface ProductionPlanifieeInterface {
    id: number;
    produitFini: string;
    quantitePlanifiee: number;
    dateProduction: Date;
    status: string;
}
export class ProductionPlanifiee extends Model <ProductionPlanifieeInterface> {
    public id!: number;
    public produitFini!: string;
    public quantitePlanifiee!: number;
    public dateProduction!: Date;
    public status!: string;
}
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
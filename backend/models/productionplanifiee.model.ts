import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface ProductionPlanifieeInterface {
    idproductionplanifiee: number;
    quantite_planifiee: number;
    status: string;
    idrecette: number;
}
export class ProductionPlanifiee extends Model <ProductionPlanifieeInterface> {
    public idproductionplanifiee!: number;
    public quantite_planifiee!: number;
    public status!: string;
    public idrecette!: number;
}
ProductionPlanifiee.init(
    {
        idproductionplanifiee: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        quantite_planifiee: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING(50),
        },
        idrecette: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "recettes",
                key: "idrecette",
            },
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
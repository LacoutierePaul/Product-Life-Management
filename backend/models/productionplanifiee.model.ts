import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface ProductionPlanifieeInterface {
    idproductionplanifiee: number;
    produit_fini: string;
    quantite_planifiee: number;
    status: string;
    idrecette: number;
    idcontrole: number;
}
export class ProductionPlanifiee extends Model <ProductionPlanifieeInterface> {
    public idproductionplanifiee!: number;
    public produit_fini!: string;
    public quantite_planifiee!: number;
    public status!: string;
    public idrecette!: number;
    public idcontrole!: number;
}
ProductionPlanifiee.init(
    {
        idproductionplanifiee: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        produit_fini: {
            type: DataTypes.STRING(255),
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
                key: "id",
            },
        },
        idcontrole: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "controle_qualite",
                key: "id",
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
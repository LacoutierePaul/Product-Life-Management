import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Stock } from './stocks.model';

@Table({
    tableName: 'mouvements_stock',
    timestamps: false,
})
export class MouvementStock extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Stock)
    @Column(DataType.INTEGER)
    idStock!: number;

    @BelongsTo(() => Stock)
    stock!: Stock;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    typeMouvement!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantite!: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    dateMouvement!: Date;

    @Column(DataType.STRING(255))
    raison?: string;
}

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class MouvementsStock extends Model {}
MouvementsStock.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        idStock: {
            type: DataTypes.STRING(255),
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        typeMouvement: {
            type: DataTypes.STRING(50),
        },
        quantite: {
            type: DataTypes.INTEGER,
        },
        dateMouvement: {
            type: DataTypes.DATE,
        },
        raison: {
            type: DataTypes.STRING(50),
        }
    },
    {
        sequelize,
        modelName: 'MouvementsStock',
        tableName: 'mouvementsstock',
        schema: 'plm',
        timestamps: true,
    }
);

MouvementsStock.belongsTo(LearningPackage, {
    foreignKey: 'id_package',
    targetKey: 'id_package',
    onDelete: 'CASCADE',
});
LearningPackage.hasMany(LearningFact, { foreignKey: 'id_package' });
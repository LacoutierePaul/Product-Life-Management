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
import { ProductionPlanifiee } from './productionplanifiee.model';

@Table({
    tableName: 'controle_qualite',
    timestamps: false,
})
export class ControleQualite extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => ProductionPlanifiee)
    @Column(DataType.INTEGER)
    idProduction!: number;

    @BelongsTo(() => ProductionPlanifiee)
    productionPlanifiee!: ProductionPlanifiee;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateControle!: Date;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    resultat!: string;

    @Column(DataType.TEXT)
    commentaire?: string;
}
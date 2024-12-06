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
import { Recette } from './recettes.model';
import { Fournisseur } from './fournisseur.model';

@Table({
    tableName: 'ingredients_recette',
    timestamps: false,
})
export class IngredientRecette extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Recette)
    @Column(DataType.INTEGER)
    idRecette!: number;

    @BelongsTo(() => Recette)
    recette!: Recette;

    @ForeignKey(() => Fournisseur)
    @Column(DataType.INTEGER)
    idFournisseur!: number;

    @BelongsTo(() => Fournisseur)
    fournisseur!: Fournisseur;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    quantite!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    unite!: string;
}
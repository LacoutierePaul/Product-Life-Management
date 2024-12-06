import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
} from 'sequelize-typescript';

@Table({
    tableName: 'fournisseurs',
    timestamps: false,
})
export class Fournisseur extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    nom!: string;

    @Column(DataType.STRING(255))
    contact?: string;

    @Unique
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    matierePremiere!: string;

    @Column(DataType.DATE)
    dateDerniereLivraison?: Date;

    @Column(DataType.SMALLINT)
    evaluation?: number;

    @Column(DataType.TEXT)
    commentaires?: string;
}
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserInterface {
    iduser: number;
    email_user: string;
    password_user: string;
    prenom_user: string;
    nom_user: string;
    admin: boolean;
    readonly: boolean;
    edit: boolean;
    delete: boolean;
}

export class User extends Model <UserInterface> {
    public iduser!: number;
    public email_user!: string;
    public password_user!: string;
    public prenom_user!: string;
    public nom_user!: string;
    public admin!: boolean
    public readonly!: boolean;
    public edit!: boolean;
    public delete!: boolean;
}

User.init(
    {
        iduser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        email_user: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password_user: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        prenom_user: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nom_user: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        readonly: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        edit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        delete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        schema: "public",
        timestamps: true,
    }
);
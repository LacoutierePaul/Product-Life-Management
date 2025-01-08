import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: "/backend"});

const DB_HOST = process.env.DB_HOST as string
const DB_PORT = process.env.DB_PORT as string
const POSTGRES_DB = process.env.POSTGRES_DB as string
const POSTGRES_USER = process.env.POSTGRES_USER as string
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string

const sequelize = new Sequelize(
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: "postgres",
        define: {
            schema: "public",
        },
    }
);

export default sequelize;
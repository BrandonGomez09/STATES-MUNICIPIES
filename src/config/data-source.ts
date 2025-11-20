import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "pg"; 
import "dotenv/config";

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,      
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
};

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: false,
  ssl: dbConfig.ssl,
  entities: [
    "src/infrastructure/database/entities/**/*.ts",
    "dist/infrastructure/database/entities/**/*.js"
  ],
  migrations: [],
  subscribers: [],
});

export const dbClient = new Client({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,   
  password: dbConfig.password,
  database: dbConfig.database,
  ssl: dbConfig.ssl,
});
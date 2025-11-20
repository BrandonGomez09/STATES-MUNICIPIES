import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres', 
  ssl: {
    rejectUnauthorized: false
  },
});

async function createDB() {
  try {
    await client.connect();
    console.log("Conectado a AWS RDS. Verificando si existe la base de datos...");

    const dbName = process.env.DB_NAME || 'db_estados';

    await client.query(`CREATE DATABASE "${dbName}";`);
    console.log(`¡Base de datos '${dbName}' creada con éxito!`);

  } catch (err: any) {
    if (err.code === '42P04') {
      console.log(`La base de datos ya existía. (Se omite creación)`);
    } else {
      console.error("Error crítico al crear la base de datos:", err);
    }
  } finally {
    await client.end();
  }
}

createDB();
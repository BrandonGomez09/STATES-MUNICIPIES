const { Client } = require('pg');

const client = new Client({
  host: 'tramway.proxy.rlwy.net',
  port: 38997,
  user: 'postgres',
  password: 'LupTbpExMtkyKyiDoagrIcwNPFLQTzdO',
  database: 'railway', // Nos conectamos a la default para poder crear otras
  ssl: false,
});

async function createDB() {
  try {
    await client.connect();
    console.log("Conectado a Railway. Creando base de datos 'db_estados'...");
    await client.query('CREATE DATABASE db_estados;');
    console.log("✅ ¡Base de datos 'db_estados' creada con éxito!");
  } catch (err) {
    if (err.code === '42P04') {
        console.log("⚠️ La base de datos 'db_estados' ya existía.");
    } else {
        console.error("❌ Error al crear la base de datos:", err);
    }
  } finally {
    await client.end();
  }
}

createDB();
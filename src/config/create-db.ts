import { dbClient } from './data-source'; 

async function checkDatabaseConnection() {
  const dbName = dbClient.database; 

  try {
    console.log(`Verificando conexión a la base de datos: '${dbName}'...`);
    
    await dbClient.connect(); 
    
    const res = await dbClient.query('SELECT NOW() as now');
    
    console.log(`¡Conexión EXITOSA a la base de datos '${dbName}'!`);
    console.log(` Hora del servidor DB: ${res.rows[0].now}`);

  } catch (err) {
    console.error(`Error CRÍTICO: No se pudo conectar a la base de datos '${dbName}'.`);
    console.error("   Detalles:", err);
    process.exit(1);
  } finally {
    await dbClient.end();
  }
}

checkDatabaseConnection();
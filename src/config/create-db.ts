import { dbClient } from './data-source'; 

async function checkDatabaseConnection() {
  try {
    await dbClient.connect(); 
    
    const res = await dbClient.query('SELECT NOW() as now');
    
    console.log(` Hora del servidor DB: ${res.rows[0].now}`);

  } catch (err) {
    process.exit(1);
  } finally {
    await dbClient.end();
  }
}

checkDatabaseConnection();
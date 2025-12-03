import 'reflect-metadata';
import 'dotenv/config';
import { createApp } from './app';
import { AppDataSource } from './config/data-source';
import { seedDatabase } from './seed'; // <--- 1. Importamos la función

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Base de datos conectada exitosamente.');
    await seedDatabase(false); 

    const app = createApp();
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
};

main();
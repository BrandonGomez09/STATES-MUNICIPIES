import "reflect-metadata";
import express, { Application } from 'express';
import cors from 'cors'; 
import { createStateRoutes } from '@infrastructure/api/routes/StateRoutes';
import { stateController } from '@infrastructure/api/dependencies/dependencies';

export const createApp = (): Application => {
  const app: Application = express();

  // Middlewares
  app.use(cors()); 
  app.use(express.json()); 

  // Rutas
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servicio de estados funcionando' });
  });

  app.use('/api', createStateRoutes(stateController));

  return app;
};
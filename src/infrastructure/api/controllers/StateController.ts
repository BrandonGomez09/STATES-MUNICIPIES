import { Request, Response } from 'express';
import { GetAllStatesUseCase } from '@application/use-cases/GetAllStatesUseCase';
import { GetStateByIdUseCase } from '@application/use-cases/GetStateByIdUseCase';
import { GetMunicipalitiesByStateUseCase } from '@application/use-cases/GetMunicipalitiesByStateUseCase';

export class StateController {

  constructor(
    private readonly getAllStatesUseCase: GetAllStatesUseCase,
    private readonly getStateByIdUseCase: GetStateByIdUseCase,
    private readonly getMunicipalitiesByStateUseCase: GetMunicipalitiesByStateUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {

      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');

      const result = await this.getAllStatesUseCase.execute({ page, limit });
      res.status(200).json(result);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }


  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const state = await this.getStateByIdUseCase.execute(id);
      if (!state) {
        res.status(404).json({ message: 'Estado no encontrado' });
        return;
      }
      res.status(200).json(state);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }

  async getMunicipalitiesByState(req: Request, res: Response): Promise<void> {
    try {
      const stateId = parseInt(req.params.id);

      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');

      const result = await this.getMunicipalitiesByStateUseCase.execute({ stateId, page, limit });

      res.status(200).json(result);

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor', error: (error as Error).message });
    }
  }
}

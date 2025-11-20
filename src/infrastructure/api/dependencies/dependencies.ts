import { TypeORMStateRepository } from '@infrastructure/database/repositories/TypeORMStateRepository';
import { TypeORMMunicipalityRepository } from '@infrastructure/database/repositories/TypeORMMunicipalityRepository';
import { GetAllStatesUseCase } from '@application/use-cases/GetAllStatesUseCase';
import { GetStateByIdUseCase } from '@application/use-cases/GetStateByIdUseCase';
import { GetMunicipalitiesByStateUseCase } from '@application/use-cases/GetMunicipalitiesByStateUseCase';
import { StateController } from '@infrastructure/api/controllers/StateController';

const stateRepository = new TypeORMStateRepository();
const municipalityRepository = new TypeORMMunicipalityRepository();
const getAllStatesUseCase = new GetAllStatesUseCase(stateRepository);
const getStateByIdUseCase = new GetStateByIdUseCase(stateRepository);
const getMunicipalitiesByStateUseCase = new GetMunicipalitiesByStateUseCase(municipalityRepository);

export const stateController = new StateController(
  getAllStatesUseCase,
  getStateByIdUseCase,
  getMunicipalitiesByStateUseCase
);

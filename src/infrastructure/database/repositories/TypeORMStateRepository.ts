import { IStateRepository } from "@domain/repositories/IStateRepository";
import { State } from "@domain/entities/State";
import { PaginatedResponse } from "@domain/types/PaginatedResponse";
import { AppDataSource } from "@config/data-source";
import { StateEntity } from "@infrastructure/database/entities/StateEntity";

export class TypeORMStateRepository implements IStateRepository {
  
  private stateRepo = AppDataSource.getRepository(StateEntity);

  async findPaginated({ page, limit }: { page: number; limit: number; }): Promise<PaginatedResponse<State>> {
    
    const take = limit;
    const skip = (page - 1) * take;

    const [entities, totalItems] = await this.stateRepo.findAndCount({
      take: take,
      skip: skip,
      order: {
        id: 'ASC' 
      }
    });

    const totalPages = Math.ceil(totalItems / take);

    const data: State[] = entities;

    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async findById(id: number): Promise<State | null> {
    const entity = await this.stateRepo.findOne({
      where: { id: id }
    });

    return entity; 
  }
}
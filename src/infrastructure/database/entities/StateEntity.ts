import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MunicipalityEntity } from "./MunicipalityEntity";

@Entity('states')
export class StateEntity {

  @PrimaryGeneratedColumn()
  id!: number;


  @Column()
  name!: string;
  @OneToMany(() => MunicipalityEntity, (municipality) => municipality.state)
  municipalities!: MunicipalityEntity[];
}

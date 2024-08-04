import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateAreaEstudio extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_area_estudio: number;

  @property({
    type: 'number',
    required: true,
  })
  id_sede: number;

  @property({
    type: 'string',
    required: true,
  })
  nom_area_estudio: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_area_estudio: string;


  constructor(data?: Partial<ModelUpdateAreaEstudio>) {
    super(data);
  }
}

export interface ModelUpdateAreaEstudioRelations {
  // describe navigational properties here
}

export type ModelUpdateAreaEstudioWithRelations = ModelUpdateAreaEstudio & ModelUpdateAreaEstudioRelations;

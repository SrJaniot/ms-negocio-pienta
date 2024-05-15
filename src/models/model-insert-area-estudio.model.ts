import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertAreaEstudio extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_AreaEstudio: string;

  @property({
    type: 'string',
    required: true,
  })
  Desc_AreaEstudio: string;

  @property({
    type: 'number',
    required: true,
  })
  id_sede: number;


  constructor(data?: Partial<ModelInsertAreaEstudio>) {
    super(data);
  }
}

export interface InsertAreaEstudioRelations {
  // describe navigational properties here
}

export type InsertAreaEstudioWithRelations = ModelInsertAreaEstudio & InsertAreaEstudioRelations;

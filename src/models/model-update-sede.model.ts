import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateSede extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_sede: number;

  @property({
    type: 'string',
    required: true,
  })
  nom_sede: string;

  @property({
    type: 'string',
    required: true,
  })
  dir_sede: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_sede: string;

  @property({
    type: 'string',
    required: true,
  })
  email_sede: string;

  @property({
    type: 'number',
    required: true,
  })
  id_institucion: number;


  constructor(data?: Partial<ModelUpdateSede>) {
    super(data);
  }
}

export interface ModelUpdateSedeRelations {
  // describe navigational properties here
}

export type ModelUpdateSedeWithRelations = ModelUpdateSede & ModelUpdateSedeRelations;

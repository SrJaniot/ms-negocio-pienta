import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateOpcion extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_opcion: number;

  @property({
    type: 'number',
    required: true,
  })
  id_pregunta: number;

  @property({
    type: 'string',
    required: true,
  })
  Texto_opcion: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Opcion_Correcta: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Imagen_opcion: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_opcion: string;


  constructor(data?: Partial<ModelUpdateOpcion>) {
    super(data);
  }
}

export interface ModelUpdateOpcionRelations {
  // describe navigational properties here
}

export type ModelUpdateOpcionWithRelations = ModelUpdateOpcion & ModelUpdateOpcionRelations;

import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertOpcion extends Model {
  @property({
    type: 'number',
    required: true,
  })
  Id_Pregunta: number;

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


  constructor(data?: Partial<ModelInsertOpcion>) {
    super(data);
  }
}

export interface ModelInsertOpcionRelations {
  // describe navigational properties here
}

export type ModelInsertOpcionWithRelations = ModelInsertOpcion & ModelInsertOpcionRelations;

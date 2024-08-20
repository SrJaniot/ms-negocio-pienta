import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertTutor extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'number',
    required: true,
  })
  id_tutor: number;

  @property({
    type: 'string',
    generated: true,
  })
  direccion?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  id_area_evaluar: number;


  constructor(data?: Partial<ModelInsertTutor>) {
    super(data);
  }
}

export interface ModelInsertTutorRelations {
  // describe navigational properties here
}

export type ModelInsertTutorWithRelations = ModelInsertTutor & ModelInsertTutorRelations;

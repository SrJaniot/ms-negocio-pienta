import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateEstudiante extends Model {
  @property({
    type: 'string',
    required: true,
  })
  num_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

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
  id_grupo_estudio: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;


  constructor(data?: Partial<ModelUpdateEstudiante>) {
    super(data);
  }
}

export interface ModelUpdateEstudianteRelations {
  // describe navigational properties here
}

export type ModelUpdateEstudianteWithRelations = ModelUpdateEstudiante & ModelUpdateEstudianteRelations;

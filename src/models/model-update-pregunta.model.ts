import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdatePregunta extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_pregunta: number;

  @property({
    type: 'number',
    required: true,
  })
  id_contexto: number;

  @property({
    type: 'string',
    required: true,
  })
  enunciado_pregunta: string;

  @property({
    type: 'number',
    required: true,
  })
  tipo_pregunta: number;

  @property({
    type: 'number',
    required: true,
  })
  puntaje_pregunta: number;

  @property({
    type: 'string',
    required: true,
  })
  autor_pregunta: string;

  @property({
    type: 'string',
    required: true,
  })
  Imagen_pregunta: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_pregunta_contenido: string;

  @property({
    type: 'string',
    required: true,
  })
  Layout_pregunta: string;


  constructor(data?: Partial<ModelUpdatePregunta>) {
    super(data);
  }
}

export interface ModelUpdatePreguntaRelations {
  // describe navigational properties here
}

export type ModelUpdatePreguntaWithRelations = ModelUpdatePregunta & ModelUpdatePreguntaRelations;

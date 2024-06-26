import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertPregunta extends Model {
  @property({
    type: 'number',
    required: true,
  })
  Id_Contexto: number;

  @property({
    type: 'string',
    required: true,
  })
  Texto_Pregunta: string;

  @property({
    type: 'number',
    required: true,
  })
  Tipo_pregunta: number;

  @property({
    type: 'number',
    required: true,
  })
  Puntaje_Pregunta: number;

  @property({
    type: 'string',
    required: true,
  })
  Autor_Pregunta: string;

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


  constructor(data?: Partial<ModelInsertPregunta>) {
    super(data);
  }
}

export interface ModelInsertPreguntaRelations {
  // describe navigational properties here
}

export type ModelInsertPreguntaWithRelations = ModelInsertPregunta & ModelInsertPreguntaRelations;

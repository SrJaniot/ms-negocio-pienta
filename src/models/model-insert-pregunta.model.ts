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


  constructor(data?: Partial<ModelInsertPregunta>) {
    super(data);
  }
}

export interface ModelInsertPreguntaRelations {
  // describe navigational properties here
}

export type ModelInsertPreguntaWithRelations = ModelInsertPregunta & ModelInsertPreguntaRelations;

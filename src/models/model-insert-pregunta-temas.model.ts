import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertPreguntaTemas extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_pregunta: number;

  @property({
    type: 'number',
    required: true,
  })
  id_tema_area: number;


  constructor(data?: Partial<ModelInsertPreguntaTemas>) {
    super(data);
  }
}

export interface ModelInsertPreguntaTemasRelations {
  // describe navigational properties here
}

export type ModelInsertPreguntaTemasWithRelations = ModelInsertPreguntaTemas & ModelInsertPreguntaTemasRelations;

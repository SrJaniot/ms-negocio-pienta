import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertarRespuestasPreguntasEstudiantePrueba extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_prueba: number;

  @property({
    type: 'string',
    required: true,
  })
  id_estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  preguntas_opciones: string;


  constructor(data?: Partial<ModelInsertarRespuestasPreguntasEstudiantePrueba>) {
    super(data);
  }
}

export interface ModelInsertarRespuestasPreguntasEstudiantePruebaRelations {
  // describe navigational properties here
}

export type ModelInsertarRespuestasPreguntasEstudiantePruebaWithRelations = ModelInsertarRespuestasPreguntasEstudiantePrueba & ModelInsertarRespuestasPreguntasEstudiantePruebaRelations;

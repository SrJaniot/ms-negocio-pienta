import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertFechaInicioPruebaEstudiante extends Model {
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
    type: 'number',
    required: true,
  })
  Duracion_minutos_Prueba: number;


  constructor(data?: Partial<ModelInsertFechaInicioPruebaEstudiante>) {
    super(data);
  }
}

export interface ModelInsertFechaInicioPruebaEstudianteRelations {
  // describe navigational properties here
}

export type ModelInsertFechaInicioPruebaEstudianteWithRelations = ModelInsertFechaInicioPruebaEstudiante & ModelInsertFechaInicioPruebaEstudianteRelations;

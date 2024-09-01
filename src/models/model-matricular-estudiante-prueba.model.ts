import {Model, model, property} from '@loopback/repository';

@model()
export class ModelMatricularEstudiantePrueba extends Model {
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


  constructor(data?: Partial<ModelMatricularEstudiantePrueba>) {
    super(data);
  }
}

export interface ModelMatricularEstudiantePruebaRelations {
  // describe navigational properties here
}

export type ModelMatricularEstudiantePruebaWithRelations = ModelMatricularEstudiantePrueba & ModelMatricularEstudiantePruebaRelations;

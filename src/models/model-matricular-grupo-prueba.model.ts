import {Model, model, property} from '@loopback/repository';

@model()
export class ModelMatricularGrupoPrueba extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_prueba: number;

  @property({
    type: 'number',
    required: true,
  })
  id_grupo: number;


  constructor(data?: Partial<ModelMatricularGrupoPrueba>) {
    super(data);
  }
}

export interface ModelMatricularGrupoPruebaRelations {
  // describe navigational properties here
}

export type ModelMatricularGrupoPruebaWithRelations = ModelMatricularGrupoPrueba & ModelMatricularGrupoPruebaRelations;

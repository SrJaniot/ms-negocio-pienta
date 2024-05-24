import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateContexto extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id_contexto: number;

  @property({
    type: 'string',
    required: true,
  })
  Nom_contexto: string;

  @property({
    type: 'string',
    required: true,
  })
  Desc_contexto: string;

  @property({
    type: 'string',
    required: true,
  })
  Nom_archivo_contexto: string;

  @property({
    type: 'string',
    required: true,
  })
  Autor_contexto: string;


  constructor(data?: Partial<ModelUpdateContexto>) {
    super(data);
  }
}

export interface ModelUpdateContextoRelations {
  // describe navigational properties here
}

export type ModelUpdateContextoWithRelations = ModelUpdateContexto & ModelUpdateContextoRelations;

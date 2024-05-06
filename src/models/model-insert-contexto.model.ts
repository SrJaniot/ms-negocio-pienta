import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertContexto extends Model {
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


  constructor(data?: Partial<ModelInsertContexto>) {
    super(data);
  }
}

export interface ModelInsertContextoRelations {
  // describe navigational properties here
}

export type ModelInsertContextoWithRelations = ModelInsertContexto & ModelInsertContextoRelations;

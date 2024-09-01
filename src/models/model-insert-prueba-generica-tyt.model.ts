import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertPruebaGenericaTyt extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombre_prueba: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_prueba: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_prueba: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_prueba_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_prueba_fin: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo_prueba: number;


  constructor(data?: Partial<ModelInsertPruebaGenericaTyt>) {
    super(data);
  }
}

export interface ModelInsertPruebaGenericaTytRelations {
  // describe navigational properties here
}

export type ModelInsertPruebaGenericaTytWithRelations = ModelInsertPruebaGenericaTyt & ModelInsertPruebaGenericaTytRelations;

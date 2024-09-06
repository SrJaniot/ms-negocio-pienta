import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertPruebaCustom extends Model {
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
  fecha_inicio_prueba: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin_prueba: string;

  @property({
    type: 'number',
    required: true,
  })
  duracion_prueba: number;

  @property({
    type: 'string',
    required: true,
  })
  preguntas_id: string;


  constructor(data?: Partial<ModelInsertPruebaCustom>) {
    super(data);
  }
}

export interface ModelInsertPruebaCustomRelations {
  // describe navigational properties here
}

export type ModelInsertPruebaCustomWithRelations = ModelInsertPruebaCustom & ModelInsertPruebaCustomRelations;

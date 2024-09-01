import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertPruebaGenerica extends Model {
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

  @property({
    type: 'number',
    required: true,
  })
  numero_preguntas_prueba: number;

  @property({
    type: 'number',
    required: true,
  })
  id_area_evaluar: number;


  constructor(data?: Partial<ModelInsertPruebaGenerica>) {
    super(data);
  }
}

export interface ModelInsertPruebaGenericaRelations {
  // describe navigational properties here
}

export type ModelInsertPruebaGenericaWithRelations = ModelInsertPruebaGenerica & ModelInsertPruebaGenericaRelations;

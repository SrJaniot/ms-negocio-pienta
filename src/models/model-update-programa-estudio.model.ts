import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateProgramaEstudio extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_porgrama_estudio: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_programa_estudio: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_porgrama_estudio: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_formacion_programa_estudio: string;

  @property({
    type: 'number',
    required: true,
  })
  id_area_estudio: number;


  constructor(data?: Partial<ModelUpdateProgramaEstudio>) {
    super(data);
  }
}

export interface ModelUpdateProgramaEstudioRelations {
  // describe navigational properties here
}

export type ModelUpdateProgramaEstudioWithRelations = ModelUpdateProgramaEstudio & ModelUpdateProgramaEstudioRelations;

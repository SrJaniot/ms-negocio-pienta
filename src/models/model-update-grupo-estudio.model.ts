import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateGrupoEstudio extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_grupo_estudio: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_grupo_estudio: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_grupo_estudio: string;

  @property({
    type: 'string',
    required: true,
  })
  jornada_grupo_estudio: string;

  @property({
    type: 'number',
    required: true,
  })
  id_programa_estudio: number;


  constructor(data?: Partial<ModelUpdateGrupoEstudio>) {
    super(data);
  }
}

export interface ModelUpdateGrupoEstudioRelations {
  // describe navigational properties here
}

export type ModelUpdateGrupoEstudioWithRelations = ModelUpdateGrupoEstudio & ModelUpdateGrupoEstudioRelations;

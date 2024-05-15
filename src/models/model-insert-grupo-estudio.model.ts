import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertGrupoEstudio extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_GrupoEstudio: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion_GrupoEstudio: string;

  @property({
    type: 'string',
    required: true,
  })
  Jornada_GrupoEstudio: string;

  @property({
    type: 'number',
    required: true,
  })
  id_programa_estudio: number;

  @property({
    type: 'number',
    required: true,
  })
  id_grupo_estudio: number;


  constructor(data?: Partial<ModelInsertGrupoEstudio>) {
    super(data);
  }
}

export interface ModelInsertGrupoEstudioRelations {
  // describe navigational properties here
}

export type ModelInsertGrupoEstudioWithRelations = ModelInsertGrupoEstudio & ModelInsertGrupoEstudioRelations;

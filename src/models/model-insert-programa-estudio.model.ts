import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertProgramaEstudio extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_ProgramaEstudio: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion_ProgramaEstudio: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_Formacion: string;

  @property({
    type: 'number',
    required: true,
  })
  id_area_estudio: number;


  constructor(data?: Partial<ModelInsertProgramaEstudio>) {
    super(data);
  }
}

export interface ModelInsertProgramaEstudioRelations {
  // describe navigational properties here
}

export type ModelInsertProgramaEstudioWithRelations = ModelInsertProgramaEstudio & ModelInsertProgramaEstudioRelations;

import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertEstudiante extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_Estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion_Estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono_estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo_Estudiante: string;

  @property({
    type: 'number',
    required: true,
  })
  id_grupo_estudio: number;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id_estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_documento_Estudiante: string;


  constructor(data?: Partial<ModelInsertEstudiante>) {
    super(data);
  }
}

export interface ModelInsertEstudianteRelations {
  // describe navigational properties here
}

export type ModelInsertEstudianteWithRelations = ModelInsertEstudiante & ModelInsertEstudianteRelations;

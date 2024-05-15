import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertInstitucion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_institucion: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion_institucion: string;

  @property({
    type: 'string',
    required: true,
  })
  Representante_institucion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_institucion: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo_institucion: string;

  @property({
    type: 'string',
    required: true,
  })
  id_ciudad: string;


  constructor(data?: Partial<ModelInsertInstitucion>) {
    super(data);
  }
}

export interface ModelInsertInstitucionRelations {
  // describe navigational properties here
}

export type ModelInsertInstitucionWithRelations = ModelInsertInstitucion & ModelInsertInstitucionRelations;

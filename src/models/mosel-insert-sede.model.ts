import {Model, model, property} from '@loopback/repository';

@model()
export class MoselInsertSede extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Nom_sede: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion_Sede: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono_Sede: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo_Sede: string;

  @property({
    type: 'number',
    required: true,
  })
  id_institucion: number;


  constructor(data?: Partial<MoselInsertSede>) {
    super(data);
  }
}

export interface MoselInsertSedeRelations {
  // describe navigational properties here
}

export type MoselInsertSedeWithRelations = MoselInsertSede & MoselInsertSedeRelations;

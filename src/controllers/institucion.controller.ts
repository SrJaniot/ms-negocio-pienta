// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,   IdEntero,   ModelInsertAreaEstudio,   ModelInsertEstudiante,   ModelInsertGrupoEstudio,   ModelInsertInstitucion, ModelInsertProgramaEstudio, ModelUpdateAreaEstudio, ModelUpdateSede, MoselInsertSede,  } from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';

export class InstitucionController {
//Generacion de un repositorio generico para conectarme a la base de datos postgresql
private genericRepository: DefaultCrudRepository <GenericModel, typeof GenericModel.prototype.id>;

constructor(
  // inyectar el datasource de postgresql
  @inject('datasources.postgres') dataSource:  juggler.DataSource,
) {
  //configuracion del genericRepository para que se conecte a la base de datos postgresql
  this.genericRepository = new DefaultCrudRepository<any,any>(
    GenericModel,
    dataSource
  );
}


//METODOS PARA EL CONTROLADOR DE INSTITUCION ---------------------------------------------------------------------------------------------------------
//METODO PARA CREAR UNA INSTITUCION



@post('/CrearInstitucion')
@response(200, {
  description: 'creacion de un institucion',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertInstitucion),
    },
  },
})
async crearinstitucion(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertInstitucion),
      },
    },
  })
  data: ModelInsertInstitucion,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearInstitucion;
    const params =[
      data.Nom_institucion,
      data.Direccion_institucion,
      data.Representante_institucion,
      data.telefono_institucion,
      data.Correo_institucion,
      data.id_ciudad,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    if(result[0].fun_insertar_institucion_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_institucion_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_institucion_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_institucion_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_institucion_json.MENSAJE,
      "DATOS": result[0].fun_insertar_institucion_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}





// METODO PARA CREAR SEDES DE UNA INSTITUCION
@post('/CrearSede')
@response(200, {
  description: 'creacion de un sede',
  content:{
    'application/json':{
      schema: getModelSchemaRef(MoselInsertSede),
    },
  },
})
async crearSede(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(MoselInsertSede),
      },
    },
  })
  data: MoselInsertSede,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearSede;
    const params =[
      data.Nom_sede,
      data.Direccion_Sede,
      data.Telefono_Sede,
      data.Correo_Sede,
      data.id_institucion,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_SEDE_JSON  fun_insertar_sede_json
    if(result[0].fun_insertar_sede_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_sede_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_sede_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_sede_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_sede_json.MENSAJE,
      "DATOS": result[0].fun_insertar_sede_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO PARA OBTENERT UNA SEDE A PARTIR DE SU ID
@get('/ObtenerSede/{id_sede}')
@response(200, {
 description: 'Obtener sede por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerContextoID(
 @param.path.number('id_sede') id_sede: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerSede;
   const params =[
    id_sede
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_SEDE() fun_obtener_sede()
   if(result[0].fun_obtener_sede.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_sede.CODIGO,
       "MENSAJE": result[0].fun_obtener_sede.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_sede.CODIGO,
     "MENSAJE": result[0].fun_obtener_sede.MENSAJE,
     "DATOS": result[0].fun_obtener_sede.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}


//METODO PARA ACTUALIZAR UNA SEDE POR ID

@post('/ActualizarSede')
@response(200, {
  description: 'Actualizar  un SEDE',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateSede),
    },
  },
})
async Actualizarcontexto(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateSede),
      },
    },
  })
  data: ModelUpdateSede,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarSede;
    const params =[
      data.id_sede,
      data.nom_sede,
      data.dir_sede,
      data.tel_sede,
      data.email_sede,
      data.id_institucion,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_SEDE()  fun_actualizar_sede()
    if(result[0].fun_actualizar_sede.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_sede.CODIGO,
        "MENSAJE": result[0].fun_actualizar_sede.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_sede.CODIGO,
      "MENSAJE": result[0].fun_actualizar_sede.MENSAJE,
      "DATOS": result[0].fun_actualizar_sede.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}



//METODO PARA ELIMINAR UNA SEDE POR ID

@post('/EliminarSede')
@response(200, {
  description: 'eliminar  una sede',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async Eliminarcontexto(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(IdEntero),
      },
    },
  })
  id: IdEntero,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.EliminarSede;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_SEDE() fun_eliminar_sede()
    if(result[0].fun_eliminar_sede.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_sede.CODIGO,
        "MENSAJE": result[0].fun_eliminar_sede.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_sede.CODIGO,
      "MENSAJE": result[0].fun_eliminar_sede.MENSAJE,
      "DATOS": result[0].fun_eliminar_sede.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}




 //METODO GET PARA OBTENER DATOS DE LA TABLA SEDE USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerSedes')
 @response(200, {
   description: 'Obtener Sedes',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerContexto():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerSedes;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_SEDES()  fun_obtener_sedes()

     if(result[0].fun_obtener_sedes.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_sedes.CODIGO,
         "MENSAJE": result[0].fun_obtener_sedes.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_sedes.CODIGO,
       "MENSAJE": result[0].fun_obtener_sedes.MENSAJE,
       "DATOS": result[0].fun_obtener_sedes.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }






//METODO PARA CREAR TAB_AREA_ESTUDIO

@post('/CrearAreaEstudio')
@response(200, {
  description: 'creacion de un Area de estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertAreaEstudio),
    },
  },
})
async crearAreaEstudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertAreaEstudio),
      },
    },
  })
  data: ModelInsertAreaEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearAreaEstudio;
    const params =[
      data.Nom_AreaEstudio,
      data.Desc_AreaEstudio,
      data.id_sede,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_AREA_ESTUDIO_JSON    fun_insertar_area_estudio_json

    if(result[0].fun_insertar_area_estudio_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_area_estudio_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_area_estudio_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_area_estudio_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_area_estudio_json.MENSAJE,
      "DATOS": result[0].fun_insertar_area_estudio_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO GET PARA OBTENER UNA AREA ESTUDIO POR ID

@get('/ObtenerAreaEstudio/{id_area_estudio}')
@response(200, {
 description: 'Obtener Area Estudio por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerAreaEstudioID(
 @param.path.number('id_area_estudio') id_area_estudio: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerAreaEstudio;
   const params =[
    id_area_estudio
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_AREA_ESTUDIO() fun_obtener_area_estudio()
   if(result[0].fun_obtener_area_estudio.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_area_estudio.CODIGO,
       "MENSAJE": result[0].fun_obtener_area_estudio.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_area_estudio.CODIGO,
     "MENSAJE": result[0].fun_obtener_area_estudio.MENSAJE,
     "DATOS": result[0].fun_obtener_area_estudio.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}






 //METODO GET PARA OBTENER DATOS DE LA TABLA AREA ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerAreasEstudio')
 @response(200, {
   description: 'Obtener Sedes',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerAreaEstudio():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerAreasEstudios;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_AREAS_ESTUDIOS()  fun_obtener_areas_estudios()

     if(result[0].fun_obtener_areas_estudios.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_areas_estudios.CODIGO,
         "MENSAJE": result[0].fun_obtener_areas_estudios.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_areas_estudios.CODIGO,
       "MENSAJE": result[0].fun_obtener_areas_estudios.MENSAJE,
       "DATOS": result[0].fun_obtener_areas_estudios.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }


//METODO PARA ACTUALIZAR UNA AREA ESTUDIO POR ID

@post('/ActualizarAreaEstudio')
@response(200, {
  description: 'Actualizar  un Area Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateAreaEstudio),
    },
  },
})
async ActualizarAreaEstudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateAreaEstudio),
      },
    },
  })
  data: ModelUpdateAreaEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarAreaEstudio;
    const params =[
      data.id_area_estudio,
      data.nom_area_estudio,
      data.descripcion_area_estudio,
      data.id_sede
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_AREA_ESTUDIO()  fun_actualizar_area_estudio()
    if(result[0].fun_actualizar_area_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_area_estudio.CODIGO,
        "MENSAJE": result[0].fun_actualizar_area_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_area_estudio.CODIGO,
      "MENSAJE": result[0].fun_actualizar_area_estudio.MENSAJE,
      "DATOS": result[0].fun_actualizar_area_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA ELIMINAR UNA AREA ESTUDIO POR ID

@post('/EliminarAreaEstudio')
@response(200, {
  description: 'eliminar  una Area Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async EliminarAreaEstudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(IdEntero),
      },
    },
  })
  id: IdEntero,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.EliminarAreaEstudio;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_AREA_ESTUDIO() fun_eliminar_area_estudio()
    if(result[0].fun_eliminar_area_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_area_estudio.CODIGO,
        "MENSAJE": result[0].fun_eliminar_area_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_area_estudio.CODIGO,
      "MENSAJE": result[0].fun_eliminar_area_estudio.MENSAJE,
      "DATOS": result[0].fun_eliminar_area_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}






//METODO PARA CREAR PROGRAMA_ESTUDIO


@post('/CrearProgramaEstudio')
@response(200, {
  description: 'creacion de un Area de estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertProgramaEstudio),
    },
  },
})
async crearProgramaEestudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertProgramaEstudio),
      },
    },
  })
  data: ModelInsertProgramaEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearProgramaEstudio;
    const params =[
      data.Nom_ProgramaEstudio,
      data.Descripcion_ProgramaEstudio,
      data.Tipo_Formacion,
      data.id_area_estudio,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_PROGRAMAS_ESTUDIO_JSON   fun_insertar_programas_estudio_json

    if(result[0].fun_insertar_programas_estudio_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_programas_estudio_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_programas_estudio_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_programas_estudio_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_programas_estudio_json.MENSAJE,
      "DATOS": result[0].fun_insertar_programas_estudio_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA CREAR GRUPO_ESTUDIO



@post('/CrearGrupoEstudio')
@response(200, {
  description: 'creacion de un grupo de estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertGrupoEstudio),
    },
  },
})
async crearGrupoEestudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertGrupoEstudio),
      },
    },
  })
  data: ModelInsertGrupoEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearGrupoEstudio;
    const params =[
      data.Nom_GrupoEstudio,
      data.Descripcion_GrupoEstudio,
      data.Jornada_GrupoEstudio,
      data.id_programa_estudio,
      data.id_grupo_estudio,
    ];
    console.log(params);
    console.log(sql);
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_GRUPO_ESTUDIO_JSON   fun_insertar_grupo_estudio_json

    if(result[0].fun_insertar_grupo_estudio_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_grupo_estudio_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_grupo_estudio_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_grupo_estudio_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_grupo_estudio_json.MENSAJE,
      "DATOS": result[0].fun_insertar_grupo_estudio_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA CREAR Estudiante

@post('/CrearEstudiante')
@response(200, {
  description: 'creacion de un Estudiante',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertEstudiante),
    },
  },
})
async crearEstudiante(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertEstudiante),
      },
    },
  })
  data: ModelInsertEstudiante,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearEstudiante;
    const params =[
      data.Nom_Estudiante,
      data.Direccion_Estudiante,
      data.Telefono_estudiante,
      data.Correo_Estudiante,
      data.id_grupo_estudio,
      data.id_estudiante,
      data.Tipo_documento_Estudiante,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_ESTUDIANTE_JSON    fun_insertar_estudiante_json

    if(result[0].fun_insertar_estudiante_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_estudiante_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_estudiante_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_estudiante_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_estudiante_json.MENSAJE,
      "DATOS": result[0].fun_insertar_estudiante_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO GET PARA OBTENER TODAS LAS INSTITUCIONES
 @get('/ObtenerInstituciones')
 @response(200, {
   description: 'Obtener Instituciones',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerInstituciones():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerInstituciones;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_CONSULTAR_INSTITUCIONES()  fun_consultar_instituciones()

     if(result[0].fun_consultar_instituciones.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_consultar_instituciones.CODIGO,
         "MENSAJE": result[0].fun_consultar_instituciones.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_consultar_instituciones.CODIGO,
       "MENSAJE": result[0].fun_consultar_instituciones.MENSAJE,
       "DATOS": result[0].fun_consultar_instituciones.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }









}

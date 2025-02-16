// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,   IdEntero,   ModelInsertAreaEstudio,   ModelInsertEstudiante,   ModelInsertGrupoEstudio,   ModelInsertInstitucion, ModelInsertProgramaEstudio, ModelInsertTutor, ModelUpdateAreaEstudio, ModelUpdateEstudiante, ModelUpdateGrupoEstudio, ModelUpdateProgramaEstudio, ModelUpdateSede, MoselInsertSede,  } from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

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


@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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




@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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

@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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





@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})

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




@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
 //METODO GET PARA OBTENER DATOS DE LA TABLA PROGRAMA ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerProgramasEstudio')
 @response(200, {
   description: 'Obtener Sedes',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerProgramasEstudio():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerProgramasEstudios;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_PROGRAMAS_ESTUDIO()  fun_obtener_programas_estudio()

     if(result[0].fun_obtener_programas_estudio.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_programas_estudio.CODIGO,
         "MENSAJE": result[0].fun_obtener_programas_estudio.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_programas_estudio.CODIGO,
       "MENSAJE": result[0].fun_obtener_programas_estudio.MENSAJE,
       "DATOS": result[0].fun_obtener_programas_estudio.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }





//METODO GET PARA OBTENER UNA PROGRAMA ESTUDIO POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@get('/ObtenerProgramaEstudio/{id_programa_estudio}')
@response(200, {
 description: 'Obtener programa Estudio por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerProgramaEstudioID(
 @param.path.number('id_programa_estudio') id_programa_estudio: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerProgramaEstudio;
   const params =[
    id_programa_estudio
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_PROGRAMA_ESTUDIO() fun_obtener_programa_estudio()
   if(result[0].fun_obtener_programa_estudio.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_programa_estudio.CODIGO,
       "MENSAJE": result[0].fun_obtener_programa_estudio.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_programa_estudio.CODIGO,
     "MENSAJE": result[0].fun_obtener_programa_estudio.MENSAJE,
     "DATOS": result[0].fun_obtener_programa_estudio.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}





//METODO PARA ACTUALIZAR UNA Programa ESTUDIO POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/ActualizarProgramaEstudio')
@response(200, {
  description: 'Actualizar  un Programa Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateProgramaEstudio),
    },
  },
})
async ActualizarProgramaEstudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateProgramaEstudio),
      },
    },
  })
  data: ModelUpdateProgramaEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarProgramaEstudio;
    const params =[
      data.id_porgrama_estudio,
      data.nombre_programa_estudio,
      data.descripcion_porgrama_estudio,
      data.tipo_formacion_programa_estudio,
      data.id_area_estudio

    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_PROGRAMA_ESTUDIO()  fun_actualizar_programa_estudio()
    if(result[0].fun_actualizar_programa_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_programa_estudio.CODIGO,
        "MENSAJE": result[0].fun_actualizar_programa_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_programa_estudio.CODIGO,
      "MENSAJE": result[0].fun_actualizar_programa_estudio.MENSAJE,
      "DATOS": result[0].fun_actualizar_programa_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}




//METODO PARA ELIMINAR UNA PROGRAMA ESTUDIO POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/EliminarProgramaEstudio')
@response(200, {
  description: 'eliminar  una programa Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async EliminarProgramaEstudio(
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
    const sql = SQLConfig.EliminarProgramaEstudio;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_PROGRAMA_ESTUDIO() fun_eliminar_programa_estudio()
    if(result[0].fun_eliminar_programa_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_programa_estudio.CODIGO,
        "MENSAJE": result[0].fun_eliminar_programa_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_programa_estudio.CODIGO,
      "MENSAJE": result[0].fun_eliminar_programa_estudio.MENSAJE,
      "DATOS": result[0].fun_eliminar_programa_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}















//METODO PARA CREAR GRUPO_ESTUDIO


@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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




 //METODO GET PARA OBTENER DATOS DE LA TABLA GRUPO ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.listarAccion]
})
 @get('/ObtenerGruposEstudio')
 @response(200, {
   description: 'Obtener grupos de estudio',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerGruposEstudio():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerGruposEstudios;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_GRUPOS_ESTUDIO()  fun_obtener_grupos_estudio()

     if(result[0].fun_obtener_grupos_estudio.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_grupos_estudio.CODIGO,
         "MENSAJE": result[0].fun_obtener_grupos_estudio.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_grupos_estudio.CODIGO,
       "MENSAJE": result[0].fun_obtener_grupos_estudio.MENSAJE,
       "DATOS": result[0].fun_obtener_grupos_estudio.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }





//METODO GET PARA OBTENER UNA GRUPO ESTUDIO POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.listarAccion]
})
@get('/ObtenerGrupoEstudio/{id_grupo_estudio}')
@response(200, {
 description: 'Obtener Grupo Estudio por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerGrupoEstudioID(
 @param.path.number('id_grupo_estudio') id_grupo_estudio: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerGrupoEstudio;
   const params =[
    id_grupo_estudio
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_GRUPO_ESTUDIO() fun_obtener_grupo_estudio()
   if(result[0].fun_obtener_grupo_estudio.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_grupo_estudio.CODIGO,
       "MENSAJE": result[0].fun_obtener_grupo_estudio.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_grupo_estudio.CODIGO,
     "MENSAJE": result[0].fun_obtener_grupo_estudio.MENSAJE,
     "DATOS": result[0].fun_obtener_grupo_estudio.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}



//METODO PARA ACTUALIZAR UNA GRUPO ESTUDIO POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/ActualizarGrupoEstudio')
@response(200, {
  description: 'Actualizar  un Grupo Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateGrupoEstudio),
    },
  },
})
async ActualizarGrupoEstudio(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateGrupoEstudio),
      },
    },
  })
  data: ModelUpdateGrupoEstudio,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarGrupoEstudio;
    const params =[
      data.id_grupo_estudio,
      data.nombre_grupo_estudio,
      data.descripcion_grupo_estudio,
      data.jornada_grupo_estudio,
      data.id_programa_estudio
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_GRUPO_ESTUDIO()  fun_actualizar_grupo_estudio()
    if(result[0].fun_actualizar_grupo_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_grupo_estudio.CODIGO,
        "MENSAJE": result[0].fun_actualizar_grupo_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_grupo_estudio.CODIGO,
      "MENSAJE": result[0].fun_actualizar_grupo_estudio.MENSAJE,
      "DATOS": result[0].fun_actualizar_grupo_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA ELIMINAR UNA GRUPO ESTUDIO POR ID
 //METODO GET PARA OBTENER DATOS DE LA TABLA GRUPO ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/EliminarGrupoEstudio')
@response(200, {
  description: 'eliminar  un grupo Estudio',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async EliminarGrupoEstudio(
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
    const sql = SQLConfig.EliminarGrupoEstudio;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_GRUPO_ESTUDIO() fun_eliminar_grupo_estudio()
    if(result[0].fun_eliminar_grupo_estudio.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_grupo_estudio.CODIGO,
        "MENSAJE": result[0].fun_eliminar_grupo_estudio.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_grupo_estudio.CODIGO,
      "MENSAJE": result[0].fun_eliminar_grupo_estudio.MENSAJE,
      "DATOS": result[0].fun_eliminar_grupo_estudio.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}





//METODO PARA CREAR Estudiante
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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





 //METODO GET PARA OBTENER DATOS DE LA TABLA ESTUDIANTE ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.listarAccion]
})
 @get('/ObtenerEstudiantes')
 @response(200, {
   description: 'Obtener estudiantes',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerEstudiantes():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerEstudiantes;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_ESTUDIANTES()  fun_obtener_estudiantes()

     if(result[0].fun_obtener_estudiantes.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_estudiantes.CODIGO,
         "MENSAJE": result[0].fun_obtener_estudiantes.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_estudiantes.CODIGO,
       "MENSAJE": result[0].fun_obtener_estudiantes.MENSAJE,
       "DATOS": result[0].fun_obtener_estudiantes.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }




//METODO GET PARA OBTENER UN ESTUDIANTE POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.listarAccion]
})
@get('/ObtenerEstudiante/{id_estudiante}')
@response(200, {
 description: 'Obtener Estudiante por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerEstudianteID(
 @param.path.number('id_estudiante') id_estudiante: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerEstudiante;
   const params =[
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_ESTUDIANTE() fun_obtener_estudiante()
   if(result[0].fun_obtener_estudiante.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_estudiante.CODIGO,
       "MENSAJE": result[0].fun_obtener_estudiante.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_estudiante.CODIGO,
     "MENSAJE": result[0].fun_obtener_estudiante.MENSAJE,
     "DATOS": result[0].fun_obtener_estudiante.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}



//METODO PARA ACTUALIZAR UN ESTUDIANTE POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/ActualizarEstudiante')
@response(200, {
  description: 'Actualizar  un Estudiante',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateEstudiante),
    },
  },
})
async ActualizarEstudiante(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateEstudiante),
      },
    },
  })
  data: ModelUpdateEstudiante,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarEstudiante;
    const params =[
      data.num_documento,
      data.nombre,
      data.direccion,
      data.telefono,
      data.correo,
      data.id_grupo_estudio,
      data.tipo_documento

    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_ESTUDIANTE()  fun_actualizar_estudiante()
    if(result[0].fun_actualizar_estudiante.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_estudiante.CODIGO,
        "MENSAJE": result[0].fun_actualizar_estudiante.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_estudiante.CODIGO,
      "MENSAJE": result[0].fun_actualizar_estudiante.MENSAJE,
      "DATOS": result[0].fun_actualizar_estudiante.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}





















//METODO GET PARA OBTENER TODAS LAS INSTITUCIONES
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
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




 //METODO PARA CREAR Estudiante
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/CrearTutor')
@response(200, {
  description: 'creacion de un tutor',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertTutor),
    },
  },
})
async crearTutor(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertTutor),
      },
    },
  })
  data: ModelInsertTutor,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearTutor;
    const params =[
      data.Nombre,
      data.Apellido,
      data.direccion,
      data.telefono,
      data.correo,
      data.id_area_evaluar,
      data.id_tutor,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_INSTITUCION_JSON fun_insertar_institucion_json
    // FUN_INSERTAR_TUTOR_JSON    fun_insertar_tutor_json

    if(result[0].fun_insertar_tutor_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_tutor_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_tutor_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_tutor_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_tutor_json.MENSAJE,
      "DATOS": result[0].fun_insertar_tutor_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}





 //METODO GET PARA OBTENER DATOS DE LA TABLA ESTUDIANTE ESTUDIO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
 @get('/ObtenerTutores')
 @response(200, {
   description: 'Obtener Tutores',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerTutores():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerTutores;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_TUTORES() fun_obtener_tutores()

     if(result[0].fun_obtener_tutores.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_tutores.CODIGO,
         "MENSAJE": result[0].fun_obtener_tutores.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_tutores.CODIGO,
       "MENSAJE": result[0].fun_obtener_tutores.MENSAJE,
       "DATOS": result[0].fun_obtener_tutores.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }




//METODO GET PARA OBTENER UN Turtor POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})

@get('/ObtenerTutor/{id_tutor}')
@response(200, {
 description: 'Obtener tutor por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerTutorID(
 @param.path.number('id_tutor') id_tutor: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerTutor;
   const params =[
    id_tutor
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_TUTOR() fun_obtener_tutor()
   if(result[0].fun_obtener_tutor.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_tutor.CODIGO,
       "MENSAJE": result[0].fun_obtener_tutor.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_tutor.CODIGO,
     "MENSAJE": result[0].fun_obtener_tutor.MENSAJE,
     "DATOS": result[0].fun_obtener_tutor.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}



//METODO PARA ACTUALIZAR UN ESTUDIANTE POR ID
@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuinstitucion, ConfiguracionSeguridad.guardarAccion]
})
@post('/ActualizarTutor')
@response(200, {
  description: 'Actualizar  un Estudiante',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertTutor),
    },
  },
})
async ActualizarTutor(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertTutor),
      },
    },
  })
  data: ModelInsertTutor,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarTutor;
    const params =[
      data.id_tutor,
      data.Nombre,
      data.Apellido,
      data.direccion,
      data.telefono,
      data.correo,
      data.id_area_evaluar

    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_TUTOR()  fun_actualizar_tutor()
    if(result[0].fun_actualizar_tutor.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_tutor.CODIGO,
        "MENSAJE": result[0].fun_actualizar_tutor.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_tutor.CODIGO,
      "MENSAJE": result[0].fun_actualizar_tutor.MENSAJE,
      "DATOS": result[0].fun_actualizar_tutor.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}












}


// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,  IdEntero,  ModelInsertContexto, ModelInsertOpcion, ModelInsertPregunta, ModelInsertPreguntaTemas, ModelUpdateContexto, ModelUpdateOpcion, ModelUpdatePregunta} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class ContextoPreguntaController {
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


// METODOS PARA EL CONTROLADOR DE CONTEXTO ---------------------------------------------------------------------------------------------------------


//METODO PARA CREAR UN CONTEXTO


@post('/CrearContexto')
@response(200, {
  description: 'creacion de un Contexto',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertContexto),
    },
  },
})
async crearcontexto(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertContexto),
      },
    },
  })
  data: ModelInsertContexto,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearContexto;
    const params =[
      data.Nom_contexto,
      data.Desc_contexto,
      data.Nom_archivo_contexto,
      data.Autor_contexto,
      data.Tipo_contexto
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    if(result[0].fun_insertar_contexto_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_contexto_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_contexto_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_contexto_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_contexto_json.MENSAJE,
      "DATOS": result[0].fun_insertar_contexto_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO PARA CREAR UNA PREGUNTA





@post('/CrearPregunta')
@response(200, {
  description: 'creacion de una pregunta de un contexto',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPregunta),
    },
  },
})
async crearpregunta(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPregunta),
      },
    },
  })
  data: ModelInsertPregunta,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearPregunta;
    const params =[
      data.Id_Contexto,
      data.Texto_Pregunta,
      data.Tipo_pregunta,
      data.Puntaje_Pregunta,
      data.Autor_Pregunta,
      data.Imagen_pregunta,
      data.Tipo_pregunta_contenido,
      data.Layout_pregunta
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    if(result[0].fun_insertar_pregunta_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_pregunta_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_pregunta_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_pregunta_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_pregunta_json.MENSAJE,
      "DATOS": result[0].fun_insertar_pregunta_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del PREGUNTA en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO PARA CREAR UNA PREGUNTA




@post('/CrearOpcion')
@response(200, {
  description: 'creacion de una opcion de la pregunta',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertOpcion),
    },
  },
})
async crearopcion(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertOpcion),
      },
    },
  })
  data: ModelInsertOpcion,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearOpcion;
    const params =[
      data.Id_Pregunta,
      data.Texto_opcion,
      data.Opcion_Correcta,
      data.Imagen_opcion,
      data.Tipo_opcion
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    if(result[0].fun_insertar_opciones_pregunta_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_opciones_pregunta_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_opciones_pregunta_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_opciones_pregunta_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_opciones_pregunta_json.MENSAJE,
      "DATOS": result[0].fun_insertar_opciones_pregunta_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del OPCION en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}




 //METODO GET PARA OBTENER DATOS DE LA TABLA AREAS USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerContextos')
 @response(200, {
   description: 'Obtener Contextos',
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
     const sql = SQLConfig.ObtenerContextos;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_CONSULTAR_CONTEXTO()  fun_consultar_contexto()

     if(result[0].fun_consultar_contexto.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_consultar_contexto.CODIGO,
         "MENSAJE": result[0].fun_consultar_contexto.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_consultar_contexto.CODIGO,
       "MENSAJE": result[0].fun_consultar_contexto.MENSAJE,
       "DATOS": result[0].fun_consultar_contexto.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }


//METODO GET PARA OBTENER DATOS DE LA TABLA CONTEXTO USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO ID_AREA_EVALUAR
@get('/ObtenerContexto/{id_contexto}')
@response(200, {
 description: 'Obtener Contexto por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerContextoID(
 @param.path.number('id_contexto') id_contexto: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerContextoId;
   const params =[
    id_contexto
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_CONSULTAR_CONTEXTO_ID() fun_consultar_contexto_id()
   if(result[0].fun_consultar_contexto_id.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_consultar_contexto_id.CODIGO,
       "MENSAJE": result[0].fun_consultar_contexto_id.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_consultar_contexto_id.CODIGO,
     "MENSAJE": result[0].fun_consultar_contexto_id.MENSAJE,
     "DATOS": result[0].fun_consultar_contexto_id.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}

//METODO PARA ACTUALIZAR UN CONTEXTO POR ID

@post('/ActualizarContexto')
@response(200, {
  description: 'Actualizar  un Contexto',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateContexto),
    },
  },
})
async Actualizarcontexto(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateContexto),
      },
    },
  })
  data: ModelUpdateContexto,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarContexto;
    const params =[
      data.id_contexto,
      data.Nom_contexto,
      data.Desc_contexto,
      data.Nom_archivo_contexto,
      data.Autor_contexto,
      data.Tipo_contexto
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_CONTEXTO() fun_actualizar_contexto()
    if(result[0].fun_actualizar_contexto.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_contexto.CODIGO,
        "MENSAJE": result[0].fun_actualizar_contexto.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_contexto.CODIGO,
      "MENSAJE": result[0].fun_actualizar_contexto.MENSAJE,
      "DATOS": result[0].fun_actualizar_contexto.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA ELIMINAR UN CONTEXTO POR ID

@post('/EliminarContexto')
@response(200, {
  description: 'eliminar  un Contexto',
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
    const sql = SQLConfig.EliminarContexto;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_CONTEXTO() fun_eliminar_contexto()
    if(result[0].fun_eliminar_contexto.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_contexto.CODIGO,
        "MENSAJE": result[0].fun_eliminar_contexto.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_contexto.CODIGO,
      "MENSAJE": result[0].fun_eliminar_contexto.MENSAJE,
      "DATOS": result[0].fun_eliminar_contexto.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO PARA RELACIONAR UNA PREGUNTA CON UN TEMA DE AREA

@post('/Relacionar-Pregunta-tema')
@response(200, {
  description: 'Crear una relacion entre una pregunta y un tema',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPreguntaTemas),
    },
  },
})
async relacionar_pregunta_area(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPreguntaTemas),
      },
    },
  })
  data: ModelInsertPreguntaTemas,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.RelacionarPreguntaTema;
    const params =[
      data.id_pregunta,
      data.id_tema_area,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_PREGUNTA_TEMAS_JSON() fun_insertar_pregunta_temas_json()
    if(result[0].fun_insertar_pregunta_temas_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_pregunta_temas_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_pregunta_temas_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_pregunta_temas_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_pregunta_temas_json.MENSAJE,
      "DATOS": result[0].fun_insertar_pregunta_temas_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del OPCION en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}


//METODO PARA RELACIONAR UNA PREGUNTA CON UN TEMA DE AREA UPDATE

@post('/Relacionar-Pregunta-tema-UPDATE')
@response(200, {
  description: 'Crear una relacion entre una pregunta y un tema UPDATE',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPreguntaTemas),
    },
  },
})
async relacionar_pregunta_area_UPDATE(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPreguntaTemas),
      },
    },
  })
  data: ModelInsertPreguntaTemas,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.RelacionarPreguntaTemaUPDATE;
    const params =[
      data.id_pregunta,
      data.id_tema_area,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_PREGUNTA_TEMAS()  fun_actualizar_pregunta_temas()
    if(result[0].fun_actualizar_pregunta_temas.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_pregunta_temas.CODIGO,
        "MENSAJE": result[0].fun_actualizar_pregunta_temas.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_pregunta_temas.CODIGO,
      "MENSAJE": result[0].fun_actualizar_pregunta_temas.MENSAJE,
      "DATOS": result[0].fun_actualizar_pregunta_temas.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del OPCION en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}

//METODO PARA OBTENER LAS PREGUNTAS DE UN TEMA

@get('/ObtenerPreguntas')
 @response(200, {
   description: 'Obtener Preguntas',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerPreguntas():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerPreguntas;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_CONSULTAR_PREGUNTAS()  fun_consultar_preguntas()

     if(result[0].fun_consultar_preguntas.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_consultar_preguntas.CODIGO,
         "MENSAJE": result[0].fun_consultar_preguntas.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_consultar_preguntas.CODIGO,
       "MENSAJE": result[0].fun_consultar_preguntas.MENSAJE,
       "DATOS": result[0].fun_consultar_preguntas.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }

 //METODO GET PARA OBTENER DATOS DE LA TABLA PREGUNTA USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO ID_AREA_EVALUAR
@get('/ObtenerPregunta/{id_pregunta}')
@response(200, {
 description: 'Obtener pregunta por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerPreguntaID(
 @param.path.number('id_pregunta') id_pregunta: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerPreguntaId;
   const params =[
    id_pregunta
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_CONSULTAR_PREGUNTA_ID() fun_consultar_pregunta_id()
   if(result[0].fun_consultar_pregunta_id.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_consultar_pregunta_id.CODIGO,
       "MENSAJE": result[0].fun_consultar_pregunta_id.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_consultar_pregunta_id.CODIGO,
     "MENSAJE": result[0].fun_consultar_pregunta_id.MENSAJE,
     "DATOS": result[0].fun_consultar_pregunta_id.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}




//METODO PARA ACTUALIZAR UN PREGUNTA POR ID

@post('/ActualizarPregunta')
@response(200, {
  description: 'Actualizar  una Pregunta',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdatePregunta),
    },
  },
})
async ActualizarPregunta(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdatePregunta),
      },
    },
  })
  data: ModelUpdatePregunta,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarPregunta;
    const params =[
      data.id_pregunta,
      data.id_contexto,
      data.enunciado_pregunta,
      data.tipo_pregunta,
      data.puntaje_pregunta,
      data.autor_pregunta,
      data.Imagen_pregunta,
      data.Tipo_pregunta_contenido,
      data.Layout_pregunta
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_PREGUNTA() fun_actualizar_pregunta()
    if(result[0].fun_actualizar_pregunta.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_pregunta.CODIGO,
        "MENSAJE": result[0].fun_actualizar_pregunta.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_pregunta.CODIGO,
      "MENSAJE": result[0].fun_actualizar_pregunta.MENSAJE,
      "DATOS": result[0].fun_actualizar_pregunta.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}



//METODO PARA ELIMINAR UN PREGUNTA POR ID

@post('/EliminarPregunta')
@response(200, {
  description: 'eliminar una pregunta',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async EliminarPregunta(
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
    const sql = SQLConfig.EliminarPregunta;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_PREGUNTA() fun_eliminar_pregunta()
    if(result[0].fun_eliminar_pregunta.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_pregunta.CODIGO,
        "MENSAJE": result[0].fun_eliminar_pregunta.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_pregunta.CODIGO,
      "MENSAJE": result[0].fun_eliminar_pregunta.MENSAJE,
      "DATOS": result[0].fun_eliminar_pregunta.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}




//METODO PARA OBTENER LAS opciones DE UN

@get('/ObtenerOpciones')
 @response(200, {
   description: 'Obtener opciones',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerOpciones():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerOpciones;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_OPCIONES_PREGUNTA_JSON()   fun_obtener_opciones_pregunta_json()

     if(result[0].fun_obtener_opciones_pregunta_json.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_opciones_pregunta_json.CODIGO,
         "MENSAJE": result[0].fun_obtener_opciones_pregunta_json.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_opciones_pregunta_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_opciones_pregunta_json.MENSAJE,
       "DATOS": result[0].fun_obtener_opciones_pregunta_json.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }


 //METODO GET PARA OBTENER DATOS DE LA TABLA OPCIONES USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO
@get('/ObtenerOpcion/{id_opcion}')
@response(200, {
 description: 'Obtener opcion por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerOpcionID(
 @param.path.number('id_opcion') id_opcion: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerOpcionId;
   const params =[
    id_opcion
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_OPCION_PREGUNTA_JSON() fun_obtener_opcion_pregunta_json()
   if(result[0].fun_obtener_opcion_pregunta_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_opcion_pregunta_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_opcion_pregunta_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_opcion_pregunta_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_opcion_pregunta_json.MENSAJE,
     "DATOS": result[0].fun_obtener_opcion_pregunta_json.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}






//METODO PARA ACTUALIZAR UN Opcion POR ID

@post('/ActualizarOpcion')
@response(200, {
  description: 'Actualizar una Opcion',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelUpdateOpcion),
    },
  },
})
async ActualizarOpcion(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelUpdateOpcion),
      },
    },
  })
  data: ModelUpdateOpcion,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ActualizarOpcion;
    const params =[
      data.id_opcion,
      data.id_pregunta,
      data.Texto_opcion,
      data.Opcion_Correcta,
      data.Imagen_opcion,
      data.Tipo_opcion,
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ACTUALIZAR_OPCIONES_PREGUNTA_JSON() fun_actualizar_opciones_pregunta_json()
    if(result[0].fun_actualizar_opciones_pregunta_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_actualizar_opciones_pregunta_json.CODIGO,
        "MENSAJE": result[0].fun_actualizar_opciones_pregunta_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_actualizar_opciones_pregunta_json.CODIGO,
      "MENSAJE": result[0].fun_actualizar_opciones_pregunta_json.MENSAJE,
      "DATOS": result[0].fun_actualizar_opciones_pregunta_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}



//METODO PARA ELIMINAR UN OPCION POR ID

@post('/EliminarOpcion')
@response(200, {
  description: 'eliminar una opcion',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async EliminarOpcion(
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
    const sql = SQLConfig.EliminarOpcion;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_ELIMINAR_OPCIONES_PREGUNTA_JSON() fun_eliminar_opciones_pregunta_json()
    if(result[0].fun_eliminar_opciones_pregunta_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_eliminar_opciones_pregunta_json.CODIGO,
        "MENSAJE": result[0].fun_eliminar_opciones_pregunta_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_eliminar_opciones_pregunta_json.CODIGO,
      "MENSAJE": result[0].fun_eliminar_opciones_pregunta_json.MENSAJE,
      "DATOS": result[0].fun_eliminar_opciones_pregunta_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}







 //METODO GET PARA OBTENER DATOS DE LA CONTEXTO/PREGUNTA/OPCIONES USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO ID_PREGUNTA
 @get('/ObtenerPreviewPregunta/{id_pregunta}')
 @response(200, {
  description: 'Obtener Pregunta por id concatenando opciones y contexto',
  content:{
    'application/json':{
      schema: getModelSchemaRef(GenericModel),
    },
  },
 })
 async ObtenerPreviewPregunta(
  @param.path.number('id_pregunta') id_pregunta: number,
 ):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ObtenerPreviewPregunta;
    const params =[
      id_pregunta
    ];
    //console.log(sql);
    //console.log(params);
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //FUN_CONSULTAR_CONTEXTO_PREGUNTA_OPCION_PREVIEW() fun_consultar_contexto_pregunta_opcion_preview()
    if(result[0].fun_consultar_contexto_pregunta_opcion_preview.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_consultar_contexto_pregunta_opcion_preview.CODIGO,
        "MENSAJE": result[0].fun_consultar_contexto_pregunta_opcion_preview.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_consultar_contexto_pregunta_opcion_preview.CODIGO,
      "MENSAJE": result[0].fun_consultar_contexto_pregunta_opcion_preview.MENSAJE,
      "DATOS": result[0].fun_consultar_contexto_pregunta_opcion_preview.DATOS
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




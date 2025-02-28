// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,   IdEntero, ModelInsertarRespuestasPreguntasEstudiantePrueba, ModelInsertFechaInicioPruebaEstudiante, ModelInsertPruebaCustom, ModelInsertPruebaGenerica, ModelInsertPruebaGenericaTyt, ModelMatricularEstudiantePrueba, ModelMatricularGrupoPrueba} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

// import {inject} from '@loopback/core';


export class PruebaController {
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


@authenticate({
  strategy: 'auth',
  options: [ConfiguracionSeguridad.menuprueba, ConfiguracionSeguridad.guardarAccion]
})
//METODO POST PARA CREAR UNA PRUEBA GENERICA
@post('/CrearPruebaGenerica')
@response(200, {
  description: 'creacion de un Prueba Generica',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPruebaGenerica),
    },
  },
})
async crearPruebaGenerica(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPruebaGenerica),
      },
    },
  })
  data: ModelInsertPruebaGenerica,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    let fecha_inicio = new Date(data.fecha_prueba_inicio);
    let fecha_fin = new Date(data.fecha_prueba_fin);
    fecha_inicio.setHours(fecha_inicio.getHours()-5);
    fecha_fin.setHours(fecha_fin.getHours()-5);


    const sql = SQLConfig.CrearPruebaGenerica;
    const params =[
      data.nombre_prueba,
      data.descripcion_prueba,
      data.tipo_prueba,
      fecha_inicio,
      fecha_fin,
      data.tiempo_prueba,
      data.numero_preguntas_prueba,
      data.id_area_evaluar
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_PRUEBA_GENERICA_JSON  fun_insertar_prueba_generica_json
    if(result[0].fun_insertar_prueba_generica_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_prueba_generica_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_prueba_generica_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_prueba_generica_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_prueba_generica_json.MENSAJE,
      "DATOS": result[0].fun_insertar_prueba_generica_json.DATOS
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
  options: [ConfiguracionSeguridad.menuprueba, ConfiguracionSeguridad.guardarAccion]
})
//METODO POST PARA CREAR UNA PRUEBA GENERICA TYT
@post('/CrearPruebaGenericaTYT')
@response(200, {
  description: 'creacion de un Prueba GenericaTYT',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPruebaGenericaTyt),
    },
  },
})
async crearPruebaGenericaTYT(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPruebaGenericaTyt),
      },
    },
  })
  data: ModelInsertPruebaGenericaTyt,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    //convertir la fecha inicio y fin en fecha de bogota colombia
    let fecha_inicio = new Date(data.fecha_prueba_inicio);
    let fecha_fin = new Date(data.fecha_prueba_fin);
    fecha_inicio.setHours(fecha_inicio.getHours()-5);
    fecha_fin.setHours(fecha_fin.getHours()-5);


    const sql = SQLConfig.CrearPruebaGenericaTYT;
    const params =[
      data.nombre_prueba,
      data.descripcion_prueba,
      data.tipo_prueba,
      fecha_inicio,
      fecha_fin,
      data.tiempo_prueba,
    ];
    console.log(params);


    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_PRUEBA_GENERICA_TYT_JSON  fun_insertar_prueba_generica_tyt_json
    if(result[0].fun_insertar_prueba_generica_tyt_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_prueba_generica_tyt_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_prueba_generica_tyt_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_prueba_generica_tyt_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_prueba_generica_tyt_json.MENSAJE,
      "DATOS": result[0].fun_insertar_prueba_generica_tyt_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}




//METODO GET PARA OBTENER PRUEBA POR ID

@get('/ObtenerPrueba/{id_prueba}')
@response(200, {
 description: 'Obtener prueba por id',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerPruebaID(
 @param.path.number('id_prueba') id_prueba: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerPruebaID;
   const params =[
    id_prueba
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_PRUEBA_JSON() fun_obtener_prueba_json
   if(result[0].fun_obtener_prueba_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_prueba_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_prueba_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_prueba_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_prueba_json.MENSAJE,
     "DATOS": result[0].fun_obtener_prueba_json.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}






 //METODO GET PARA OBTENER DATOS DE LA TABLA PRUEBA USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerPruebas')
 @response(200, {
   description: 'Obtener pruebas',
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
     const sql = SQLConfig.ObtenerPruebas;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_PRUEBAS_JSON()  fun_obtener_pruebas_json

     if(result[0].fun_obtener_pruebas_json.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_pruebas_json.CODIGO,
         "MENSAJE": result[0].fun_obtener_pruebas_json.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_pruebas_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_pruebas_json.MENSAJE,
       "DATOS": result[0].fun_obtener_pruebas_json.DATOS
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
  options: [ConfiguracionSeguridad.menuprueba, ConfiguracionSeguridad.guardarAccion]
})
 //METODO POST PARA MAtricular UN grupo a PRUEBA
@post('/MatricularGrupoPrueba')
@response(200, {
  description: 'Matricular un grupo a una prueba',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelMatricularGrupoPrueba),
    },
  },
})
async MatricularGrupoPrueba(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelMatricularGrupoPrueba),
      },
    },
  })
  data: ModelMatricularGrupoPrueba,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.MatricularGrupoPrueba;
    const params =[
      data.id_prueba,
      data.id_grupo
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_VINCULAR_ESTUDIANTES_A_PRUEBA  fun_vincular_estudiantes_a_prueba
    if(result[0].fun_vincular_estudiantes_a_prueba.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_vincular_estudiantes_a_prueba.CODIGO,
        "MENSAJE": result[0].fun_vincular_estudiantes_a_prueba.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_vincular_estudiantes_a_prueba.CODIGO,
      "MENSAJE": result[0].fun_vincular_estudiantes_a_prueba.MENSAJE,
      "DATOS": result[0].fun_vincular_estudiantes_a_prueba.DATOS
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
  options: [ConfiguracionSeguridad.menuprueba, ConfiguracionSeguridad.guardarAccion]
})
 //METODO POST PARA MAtricular UN ESTUDIANTE a PRUEBA
 @post('/MatricularEstudiantePrueba')
@response(200, {
  description: 'Matricular un estudiante a una prueba',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelMatricularEstudiantePrueba),
    },
  },
})
async MatricularEstudiantePrueba(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelMatricularEstudiantePrueba),
      },
    },
  })
  data: ModelMatricularEstudiantePrueba,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.MatricularEstudiantePrueba;
    const params =[
      data.id_prueba,
      data.id_estudiante

    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_VINCULAR_ESTUDIANTE_A_PRUEBA  fun_vincular_estudiante_a_prueba
    if(result[0].fun_vincular_estudiante_a_prueba.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_vincular_estudiante_a_prueba.CODIGO,
        "MENSAJE": result[0].fun_vincular_estudiante_a_prueba.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_vincular_estudiante_a_prueba.CODIGO,
      "MENSAJE": result[0].fun_vincular_estudiante_a_prueba.MENSAJE,
      "DATOS": result[0].fun_vincular_estudiante_a_prueba.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}




//METODO PARA TRAER EL PREVIEW DE LA PRUEBA

@post('/ObtenerPreviewPrueba')
@response(200, {
  description: 'Obtener preview de la prueba',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async ObtenerPreviewPrueba(
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
    const sql = SQLConfig.ObtenerPreviewPrueba;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_OBTENER_PRUEBA_DATOS_PREVIEW_JSON() fun_obtener_prueba_datos_preview_json
    if(result[0].fun_obtener_prueba_datos_preview_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_obtener_prueba_datos_preview_json.CODIGO,
        "MENSAJE": result[0].fun_obtener_prueba_datos_preview_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_obtener_prueba_datos_preview_json.CODIGO,
      "MENSAJE": result[0].fun_obtener_prueba_datos_preview_json.MENSAJE,
      "DATOS": result[0].fun_obtener_prueba_datos_preview_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}





//METODO PARA TRAER EL PREVIEW DE LA PRUEBA

@post('/ObtenerPreguntasPrueba')
@response(200, {
  description: 'Obtener Preguntas de la prueba',
  content:{
    'application/json':{
      schema: getModelSchemaRef(IdEntero),
    },
  },
})
async ObtenerPreguntasPrueba(
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
    const sql = SQLConfig.ObtenerPreguntasPrueba;
    const params =[
      id.id
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_OBTENER_ID_PREGUNTAS_PRUEBA_JSON() fun_obtener_id_preguntas_prueba_json
    if(result[0].fun_obtener_id_preguntas_prueba_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_obtener_id_preguntas_prueba_json.CODIGO,
        "MENSAJE": result[0].fun_obtener_id_preguntas_prueba_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_obtener_id_preguntas_prueba_json.CODIGO,
      "MENSAJE": result[0].fun_obtener_id_preguntas_prueba_json.MENSAJE,
      "DATOS": result[0].fun_obtener_id_preguntas_prueba_json.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "ERROR POSTGRES",
      "DATOS": error
    };
  }
}



//METODO GET PARA OBTENER UNA prueba disponible POR ID

@get('/ObtenerPruebaDisponible/{id_estudiante}')
@response(200, {
 description: 'Obtener prueba disponible por id ESTUDIANTE',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerProgramaEstudioID(
 @param.path.number('id_estudiante') id_estudiante: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerPruebaDisponibleID;
   const params =[
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_PRUEBAS_ACTIVAS_ESTUDIANTE_JSON  fun_obtener_pruebas_activas_estudiante_json
   if(result[0].fun_obtener_pruebas_activas_estudiante_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_pruebas_activas_estudiante_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_pruebas_activas_estudiante_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_pruebas_activas_estudiante_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_pruebas_activas_estudiante_json.MENSAJE,
     "DATOS": result[0].fun_obtener_pruebas_activas_estudiante_json.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}


//METODO GET PARA OBTENER UNA prueba disponible POR ID

@get('/ObtenerPruebaEnCurso/{id_estudiante}')
@response(200, {
 description: 'Obtener prueba disponible por id ESTUDIANTE',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async ObtenerPruebaEnCurso(
 @param.path.number('id_estudiante') id_estudiante: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerPruebaEnCursoID;
   const params =[
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_PRUEBAS_EN_CURSO_ESTUDIANTE_JSON  fun_obtener_pruebas_en_curso_estudiante_json
   if(result[0].fun_obtener_pruebas_en_curso_estudiante_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_pruebas_en_curso_estudiante_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_pruebas_en_curso_estudiante_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_pruebas_en_curso_estudiante_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_pruebas_en_curso_estudiante_json.MENSAJE,
     "DATOS": result[0].fun_obtener_pruebas_en_curso_estudiante_json.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}



//METODO GET PARA OBTENER UNA prueba disponible POR ID

@get('/ObtenerPruebaFinalizadas/{id_estudiante}')
@response(200, {
 description: 'Obtener prueba finalizadas por id ESTUDIANTE',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async ObtenerFinalizadas(
 @param.path.number('id_estudiante') id_estudiante: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerFinalizadasID;
   const params =[
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_FINALIZADAS_ESTUDIANTE_JSON  fun_obtener_finalizadas_estudiante_json
   if(result[0].fun_obtener_finalizadas_estudiante_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_finalizadas_estudiante_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_finalizadas_estudiante_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_finalizadas_estudiante_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_finalizadas_estudiante_json.MENSAJE,
     "DATOS": result[0].fun_obtener_finalizadas_estudiante_json.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}



//METODO GET PARA OBTENER UNA prueba disponible POR ID

@get('/ObtenerFechaInicioFinDuracionPrueba/{id_prueba}/{id_estudiante}')
@response(200, {
 description: 'Obtener prueba finalizadas por id ESTUDIANTE',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async ObtenerFechaInicioFinDuracionPrueba(
 @param.path.number('id_prueba') id_prueba: number,
 @param.path.number('id_estudiante') id_estudiante: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerFechaInicioFinDuracionPrueba;
   const params =[
    id_prueba,
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_CAPTURAR_FECHA_INICIO_PRUEBA_ESTUDIANTE  fun_capturar_fecha_inicio_prueba_estudiante
   if(result[0].fun_capturar_fecha_inicio_prueba_estudiante.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_capturar_fecha_inicio_prueba_estudiante.CODIGO,
       "MENSAJE": result[0].fun_capturar_fecha_inicio_prueba_estudiante.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_capturar_fecha_inicio_prueba_estudiante.CODIGO,
     "MENSAJE": result[0].fun_capturar_fecha_inicio_prueba_estudiante.MENSAJE,
     "DATOS": result[0].fun_capturar_fecha_inicio_prueba_estudiante.DATOS
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
  options: [ConfiguracionSeguridad.menuprueba, ConfiguracionSeguridad.guardarAccion]
})
//METODO POST PARA CREAR UNA PRUEBA Custom
@post('/CrearPruebaCustom')
@response(200, {
  description: 'creacion de un Prueba Custom',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertPruebaCustom),
    },
  },
})
async crearPruebaCustom(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertPruebaCustom),
      },
    },
  })
  data: ModelInsertPruebaCustom,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    let fecha_inicio = new Date(data.fecha_inicio_prueba);
    let fecha_fin = new Date(data.fecha_fin_prueba);
    fecha_inicio.setHours(fecha_inicio.getHours()-5);
    fecha_fin.setHours(fecha_fin.getHours()-5);


    //Comvertir data.preguntas en un json


    const sql = SQLConfig.CrearPruebaCustom;
    const params =[
      data.nombre_prueba,
      data.descripcion_prueba,
      data.tipo_prueba,
      fecha_inicio,
      fecha_fin,
      data.duracion_prueba,
      data.preguntas_id,
    ];


    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_PRUEBA_CUSTOMIZADA_JSON   fun_insertar_prueba_customizada_json
    if(result[0].fun_insertar_prueba_customizada_json.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_prueba_customizada_json.CODIGO,
        "MENSAJE": result[0].fun_insertar_prueba_customizada_json.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_insertar_prueba_customizada_json.CODIGO,
      "MENSAJE": result[0].fun_insertar_prueba_customizada_json.MENSAJE,
      "DATOS": result[0].fun_insertar_prueba_customizada_json.DATOS
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
  options: [ConfiguracionSeguridad.menupruebaestudiantes, ConfiguracionSeguridad.guardarAccion]
})
//METODO POST PARA REGISTRAR LA FECHA DE INICIO DE UNA PRUEBA DE UN ESTUDIANTE
@post('/RegistrarFechaInicioPrueba')
@response(200, {
  description: 'Registrar la fecha de inicio de una prueba de un estudiante',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertFechaInicioPruebaEstudiante),
    },
  },
})
async RegistrarFechaInicioPrueba(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertFechaInicioPruebaEstudiante),
      },
    },
  })
  data: ModelInsertFechaInicioPruebaEstudiante,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;

    const sql = SQLConfig.RegistrarFechaInicioPrueba;
    const params =[
      data.id_prueba,
      data.id_estudiante
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_REGISTRAR_FECHA_INICIO_PRUEBA_ESTUDIANTE   fun_registrar_fecha_inicio_prueba_estudiante
    if(result[0].fun_registrar_fecha_inicio_prueba_estudiante.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_registrar_fecha_inicio_prueba_estudiante.CODIGO,
        "MENSAJE": result[0].fun_registrar_fecha_inicio_prueba_estudiante.MENSAJE,
        "DATOS": null
      };
    }
    if (result[0].fun_registrar_fecha_inicio_prueba_estudiante.CODIGO ==200){
      // CUANDO LA RESPUESTA SEA CORRECTA SE GENERARA UNA CUENTA REGRESIVA PARA LLAMAR OTRA FUNCION
      const minutos = data.Duracion_minutos_Prueba; // Asegúrate de que `minutos` esté en `data`
      const milisegundos = minutos * 60 * 1000;
      // Define la función que se ejecutará después del tiempo de espera
      const finalizarPrueba = async () => {
        const sqlFinalizar = SQLConfig.RegistrarFechaFinalizarPrueba;
        const paramsFinalizar = [
          data.id_prueba,
          data.id_estudiante
        ];
        try {
          const resultFinalizar = await this.genericRepository.dataSource.execute(sqlFinalizar, paramsFinalizar);
          console.log('Prueba finalizada:', resultFinalizar);
        } catch (error) {
          console.error('Error al finalizar la prueba:', error);
        }
      };
      // Usa setTimeout para programar la ejecución de la función
      setTimeout(finalizarPrueba, milisegundos);
    }
    return {
      "CODIGO": result[0].fun_registrar_fecha_inicio_prueba_estudiante.CODIGO,
      "MENSAJE": result[0].fun_registrar_fecha_inicio_prueba_estudiante.MENSAJE,
      "DATOS": result[0].fun_registrar_fecha_inicio_prueba_estudiante.DATOS
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
  options: [ConfiguracionSeguridad.menupruebaestudiantes, ConfiguracionSeguridad.guardarAccion]
})
//METODO POST PARA CREAR UNA PRUEBA Custom
@post('/RegistrarRespuestasPreguntasPruebaEstudiante')
@response(200, {
  description: 'Registrar las respuestas de las preguntas de una prueba de un estudiante',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertarRespuestasPreguntasEstudiantePrueba),
    },
  },
})
async RegistrarRespuestasPreguntasPruebaEstudiante(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertarRespuestasPreguntasEstudiantePrueba),
      },
    },
  })
  data: ModelInsertarRespuestasPreguntasEstudiantePrueba,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;

    const sql = SQLConfig.RegistrarRespuestasPreguntasPruebaEstudiante;
    const params =[
      data.id_prueba,
      data.id_estudiante,
      data.preguntas_opciones,
    ];
    console.log(params);


    const result = await this.genericRepository.dataSource.execute(sql, params);
    console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_REGISTRAR_RESPUESTA_PREGUNTA_ESTUDIANTE   fun_registrar_respuesta_pregunta_estudiante
    if(result[0].fun_registrar_respuesta_pregunta_estudiante.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_registrar_respuesta_pregunta_estudiante.CODIGO,
        "MENSAJE": result[0].fun_registrar_respuesta_pregunta_estudiante.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_registrar_respuesta_pregunta_estudiante.CODIGO,
      "MENSAJE": result[0].fun_registrar_respuesta_pregunta_estudiante.MENSAJE,
      "DATOS": result[0].fun_registrar_respuesta_pregunta_estudiante.DATOS
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}





























}

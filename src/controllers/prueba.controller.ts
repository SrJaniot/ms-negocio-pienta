// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,   IdEntero, ModelInsertPruebaGenerica, ModelInsertPruebaGenericaTyt, ModelMatricularEstudiantePrueba, ModelMatricularGrupoPrueba} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

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
    const sql = SQLConfig.CrearPruebaGenerica;
    const params =[
      data.nombre_prueba,
      data.descripcion_prueba,
      data.tipo_prueba,
      data.fecha_prueba_inicio,
      data.fecha_prueba_fin,
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
    const sql = SQLConfig.CrearPruebaGenericaTYT;
    const params =[
      data.nombre_prueba,
      data.descripcion_prueba,
      data.tipo_prueba,
      data.fecha_prueba_inicio,
      data.fecha_prueba_fin,
      data.tiempo_prueba,
    ];
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






















}

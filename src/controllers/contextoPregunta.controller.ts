// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,  IdEntero,  ModelInsertContexto, ModelInsertOpcion, ModelInsertPregunta, ModelUpdateContexto} from '../models';
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
      data.Autor_contexto
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
      data.Autor_Pregunta
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


 //METODO GET PARA OBTENER DATOS DE LA TABLA TEMAS USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO ID_AREA_EVALUAR
//METODO GET PARA OBTENER DATOS DE LA TABLA TEMAS USANDO EL REPOSITORIO GENERICO PEDIR PARAMETRO ID_AREA_EVALUAR
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
      data.Autor_contexto
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
  description: 'Actualizar  un Contexto',
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





}




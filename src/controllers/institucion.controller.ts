// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler, Model} from '@loopback/repository';
import {GenericModel,   ModelInsertAreaEstudio,   ModelInsertEstudiante,   ModelInsertGrupoEstudio,   ModelInsertInstitucion, ModelInsertProgramaEstudio, MoselInsertSede,  } from '../models';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
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








}

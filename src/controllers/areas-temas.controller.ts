// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class AreasTemasController {
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











  // METODOS PARA EL CONTROLADOR DE AREAS Y TEMAS ---------------------------------------------------------------------------------------------------------
  //METODO GET PARA OBTENER DATOS DE LA TABLA AREAS USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
  @get('/ObtenerAreas')
  @response(200, {
    description: 'Obtener Areas',
    content:{
      'application/json':{
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async obtenerAreas():Promise<object>{
    try{
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.ObtenerAreasEvaluar;
      const result = await this.genericRepository.dataSource.execute(sql);
      // FUN_CONSULTAR_AREAS_EVALUAR()  fun_consultar_areas_evaluar()

      if(result[0].fun_consultar_areas_evaluar.CODIGO !=200){
        return {
          "CODIGO": result[0].fun_consultar_areas_evaluar.CODIGO,
          "MENSAJE": result[0].fun_consultar_areas_evaluar.MENSAJE,
          "DATOS": null
        };
      }
      return {
        "CODIGO": result[0].fun_consultar_areas_evaluar.CODIGO,
        "MENSAJE": result[0].fun_consultar_areas_evaluar.MENSAJE,
        "DATOS": result[0].fun_consultar_areas_evaluar.DATOS
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
@get('/ObtenerTemas/{id_area_evaluar}')
@response(200, {
  description: 'Obtener Temas',
  content:{
    'application/json':{
      schema: getModelSchemaRef(GenericModel),
    },
  },
})
async obtenerTemas(
  @param.path.number('id_area_evaluar') id_area_evaluar: number,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.ObtenerTemasEvaluar;
    const params =[
      id_area_evaluar
    ];
    console.log(sql);
    console.log(params);
    const result = await this.genericRepository.dataSource.execute(sql, params);
    console.log(result[0]);
    if(result[0].fun_consultar_temas_areas.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_consultar_temas_areas.CODIGO,
        "MENSAJE": result[0].fun_consultar_temas_areas.MENSAJE,
        "DATOS": null
      };
    }
    return {
      "CODIGO": result[0].fun_consultar_temas_areas.CODIGO,
      "MENSAJE": result[0].fun_consultar_temas_areas.MENSAJE,
      "DATOS": result[0].fun_consultar_temas_areas.DATOS
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

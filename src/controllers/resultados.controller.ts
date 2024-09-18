// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class ResultadosController {//Generacion de un repositorio generico para conectarme a la base de datos postgresql
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


  //METODO PARA OBTENER LOS RESULTADOS DE UNA PRUEBA PARA UN ESTUDIANTE


//METODO GET PARA OBTENER UNA prueba disponible POR ID

@get('/ObtenerResultadosPruebaEstudiante/{id_prueba}/{id_estudiante}')
@response(200, {
 description: 'Obtener los resultados de una prueba para un estudiante',
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
   const sql = SQLConfig.ObtenerResultadosPruebaEstudiante;
   const params =[
    id_prueba,
    id_estudiante
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_PRUEBA_PRESENTADA_ESTUDIANTE_RESULTADOS_JSON   fun_obtener_prueba_presentada_estudiante_resultados_json
   if(result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.CODIGO,
       "MENSAJE": result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.CODIGO,
     "MENSAJE": result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.MENSAJE,
     "DATOS": result[0].fun_obtener_prueba_presentada_estudiante_resultados_json.DATOS
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

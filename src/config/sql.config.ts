export namespace SQLConfig {

  //FUNCIONES PARA EL CONTROLADOR DE CONTEXTOPREGUNTA ---------------------------------------------------------------------------------------------------------
  export const CrearContexto: string = "SELECT FUN_INSERTAR_CONTEXTO_JSON($1,$2,$3,$4);";
  export const CrearPregunta: string = "SELECT FUN_INSERTAR_PREGUNTA_JSON($1,$2,$3,$4,$5);";
  export const CrearOpcion: string = "SELECT FUN_INSERTAR_OPCIONES_PREGUNTA_JSON($1,$2,$3);";


}

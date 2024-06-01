export namespace SQLConfig {

  //FUNCIONES PARA EL CONTROLADOR DE CONTEXTOPREGUNTA ---------------------------------------------------------------------------------------------------------
  export const CrearContexto: string = "SELECT FUN_INSERTAR_CONTEXTO_JSON($1,$2,$3,$4,$5);";
  export const CrearPregunta: string = "SELECT FUN_INSERTAR_PREGUNTA_JSON($1,$2,$3,$4,$5,$6,$7,$8);";
  export const CrearOpcion: string = "SELECT FUN_INSERTAR_OPCIONES_PREGUNTA_JSON($1,$2,$3);";
  export const ObtenerContextos: string = "SELECT FUN_CONSULTAR_CONTEXTO();";
  export const ObtenerContextoId: string = "SELECT FUN_CONSULTAR_CONTEXTO_ID($1);";
  export const ActualizarContexto: string = "SELECT FUN_ACTUALIZAR_CONTEXTO($1,$2,$3,$4,$5,$6);";
  export const EliminarContexto: string = "SELECT FUN_ELIMINAR_CONTEXTO($1);";
  export const RelacionarPreguntaTema: string = "SELECT FUN_INSERTAR_PREGUNTA_TEMAS_JSON($1,$2);";
  export const ObtenerPreguntas: string = "SELECT FUN_CONSULTAR_PREGUNTAS();";
  export const ObtenerPreguntaId: string = "SELECT FUN_CONSULTAR_PREGUNTA_ID($1);";
  export const ActualizarPregunta: string = "SELECT FUN_ACTUALIZAR_PREGUNTA($1,$2,$3,$4,$5,$6,$7,$8,$9);";
  export const EliminarPregunta: string = "SELECT FUN_ELIMINAR_PREGUNTA($1);";
  export const RelacionarPreguntaTemaUPDATE = "SELECT FUN_ACTUALIZAR_PREGUNTA_TEMAS($1,$2);";

  //FUNCIONES PARA EL CONTROLADOR DE INSTITUCION ---------------------------------------------------------------------------------------------------------
  export const CrearInstitucion: string = "SELECT FUN_INSERTAR_INSTITUCION_JSON($1,$2,$3,$4,$5,$6);";
  export const CrearSede: string = "SELECT FUN_INSERTAR_SEDE_JSON($1,$2,$3,$4,$5);";
  export const CrearAreaEstudio: string = "SELECT FUN_INSERTAR_AREA_ESTUDIO_JSON($1,$2,$3);";
  export const CrearProgramaEstudio: string = "SELECT FUN_INSERTAR_PROGRAMAS_ESTUDIO_JSON($1,$2,$3,$4);";
  export const CrearGrupoEstudio: string = "SELECT FUN_INSERTAR_GRUPO_ESTUDIO_JSON($1,$2,$3,$4,$5);";
  export const CrearEstudiante: string = "SELECT FUN_INSERTAR_ESTUDIANTE_JSON($1,$2,$3,$4,$5,$6,$7);";


  //FUNCIONES PARA EL CONTROLADOR AREASTEMAS ---------------------------------------------------------------------------------------------------------
  export const ObtenerAreasEvaluar: string = "SELECT FUN_CONSULTAR_AREAS_EVALUAR();";
  export const ObtenerTemasEvaluar: string = "SELECT FUN_CONSULTAR_TEMAS_AREAS($1);";

}

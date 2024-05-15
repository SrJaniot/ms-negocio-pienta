export namespace SQLConfig {

  //FUNCIONES PARA EL CONTROLADOR DE CONTEXTOPREGUNTA ---------------------------------------------------------------------------------------------------------
  export const CrearContexto: string = "SELECT FUN_INSERTAR_CONTEXTO_JSON($1,$2,$3,$4);";
  export const CrearPregunta: string = "SELECT FUN_INSERTAR_PREGUNTA_JSON($1,$2,$3,$4,$5);";
  export const CrearOpcion: string = "SELECT FUN_INSERTAR_OPCIONES_PREGUNTA_JSON($1,$2,$3);";

  //FUNCIONES PARA EL CONTROLADOR DE INSTITUCION ---------------------------------------------------------------------------------------------------------
  export const CrearInstitucion: string = "SELECT FUN_INSERTAR_INSTITUCION_JSON($1,$2,$3,$4,$5,$6);";
  export const CrearSede: string = "SELECT FUN_INSERTAR_SEDE_JSON($1,$2,$3,$4,$5);";
  export const CrearAreaEstudio: string = "SELECT FUN_INSERTAR_AREA_ESTUDIO_JSON($1,$2,$3);";
  export const CrearProgramaEstudio: string = "SELECT FUN_INSERTAR_PROGRAMAS_ESTUDIO_JSON($1,$2,$3,$4);";
  export const CrearGrupoEstudio: string = "SELECT FUN_INSERTAR_GRUPO_ESTUDIO_JSON($1,$2,$3,$4,$5);";
  export const CrearEstudiante: string = "SELECT FUN_INSERTAR_ESTUDIANTE_JSON($1,$2,$3,$4,$5,$6,$7);";


}

export namespace SQLConfig {

  //FUNCIONES PARA EL CONTROLADOR DE CONTEXTOPREGUNTA ---------------------------------------------------------------------------------------------------------
  export const CrearContexto: string = "SELECT FUN_INSERTAR_CONTEXTO_JSON($1,$2,$3,$4,$5);";
  export const CrearPregunta: string = "SELECT FUN_INSERTAR_PREGUNTA_JSON($1,$2,$3,$4,$5,$6,$7,$8);";
  export const CrearOpcion: string = "SELECT FUN_INSERTAR_OPCIONES_PREGUNTA_JSON($1,$2,$3,$4,$5);";
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
  export const ObtenerOpciones: string = "SELECT FUN_OBTENER_OPCIONES_PREGUNTA_JSON();";
  export const ObtenerOpcionId: string = "SELECT FUN_OBTENER_OPCION_PREGUNTA_JSON($1);";
  export const ActualizarOpcion: string = "SELECT FUN_ACTUALIZAR_OPCIONES_PREGUNTA_JSON($1,$2,$3,$4,$5,$6);";
  export const EliminarOpcion: string = "SELECT FUN_ELIMINAR_OPCIONES_PREGUNTA_JSON($1);";
  export const ObtenerPreviewPregunta: string = "SELECT FUN_CONSULTAR_CONTEXTO_PREGUNTA_OPCION_PREVIEW($1);";



  //FUNCIONES PARA EL CONTROLADOR DE INSTITUCION ---------------------------------------------------------------------------------------------------------
  export const CrearInstitucion: string = "SELECT FUN_INSERTAR_INSTITUCION_JSON($1,$2,$3,$4,$5,$6);";
  export const CrearSede: string = "SELECT FUN_INSERTAR_SEDE_JSON($1,$2,$3,$4,$5);";
  export const CrearAreaEstudio: string = "SELECT FUN_INSERTAR_AREA_ESTUDIO_JSON($1,$2,$3);";
  export const CrearProgramaEstudio: string = "SELECT FUN_INSERTAR_PROGRAMAS_ESTUDIO_JSON($1,$2,$3,$4);";
  export const CrearGrupoEstudio: string = "SELECT FUN_INSERTAR_GRUPO_ESTUDIO_JSON($1,$2,$3,$4,$5);";
  export const CrearEstudiante: string = "SELECT FUN_INSERTAR_ESTUDIANTE_JSON($1,$2,$3,$4,$5,$6,$7);";
  export const ObtenerInstituciones: string = "SELECT FUN_CONSULTAR_INSTITUCIONES();";
  export const ObtenerSede: string = "SELECT FUN_OBTENER_SEDE($1);";
  export const ActualizarSede: string = "SELECT FUN_ACTUALIZAR_SEDE($1,$2,$3,$4,$5,$6);";
  export const EliminarSede: string = "SELECT FUN_ELIMINAR_SEDE($1);";
  export const ObtenerSedes: string = "SELECT FUN_OBTENER_SEDES();";
  export const ObtenerAreasEstudios: string = "SELECT FUN_OBTENER_AREAS_ESTUDIOS();";
  export const ActualizarAreaEstudio: string = "SELECT FUN_ACTUALIZAR_AREA_ESTUDIO($1,$2,$3,$4);";
  export const ObtenerAreaEstudio: string = "SELECT FUN_OBTENER_AREA_ESTUDIO($1);";
  export const EliminarAreaEstudio: string = "SELECT FUN_ELIMINAR_AREA_ESTUDIO($1);";
  export const ObtenerProgramasEstudios: string = "SELECT FUN_OBTENER_PROGRAMAS_ESTUDIO();";
  export const ObtenerProgramaEstudio: string = "SELECT FUN_OBTENER_PROGRAMA_ESTUDIO($1);";
  export const ActualizarProgramaEstudio: string = "SELECT FUN_ACTUALIZAR_PROGRAMA_ESTUDIO($1,$2,$3,$4,$5);";
  export const EliminarProgramaEstudio: string = "SELECT FUN_ELIMINAR_PROGRAMA_ESTUDIO($1);";
  export const ObtenerGruposEstudios: string = "SELECT FUN_OBTENER_GRUPOS_ESTUDIO();";
  export const ObtenerGrupoEstudio: string = "SELECT FUN_OBTENER_GRUPO_ESTUDIO($1);";
  export const ActualizarGrupoEstudio: string = "SELECT FUN_ACTUALIZAR_GRUPO_ESTUDIO($1,$2,$3,$4,$5);";
  export const EliminarGrupoEstudio: string = "SELECT FUN_ELIMINAR_GRUPO_ESTUDIO($1);";
  export const ObtenerEstudiantes: string = "SELECT FUN_OBTENER_ESTUDIANTES();";
  export const ObtenerEstudiante: string = "SELECT FUN_OBTENER_ESTUDIANTE($1);";
  export const ActualizarEstudiante: string = "SELECT FUN_ACTUALIZAR_ESTUDIANTE($1,$2,$3,$4,$5,$6,$7);";
  export const CrearTutor: string = "SELECT FUN_INSERTAR_TUTOR_JSON($1,$2,$3,$4,$5,$6,$7);";
  export const ObtenerTutores: string = "SELECT FUN_OBTENER_TUTORES();";
  export const ObtenerTutor: string = "SELECT FUN_OBTENER_TUTOR($1);";
  export const ActualizarTutor: string = "SELECT FUN_ACTUALIZAR_TUTOR($1,$2,$3,$4,$5,$6,$7);";



  //FUNCIONES PARA EL CONTROLADOR AREASTEMAS ---------------------------------------------------------------------------------------------------------
  export const ObtenerAreasEvaluar: string = "SELECT FUN_CONSULTAR_AREAS_EVALUAR();";
  export const ObtenerTemasEvaluar: string = "SELECT FUN_CONSULTAR_TEMAS_AREAS($1);";



  //FUNCIONES PARA EL CONTROLADOR DE PRUEBA ---------------------------------------------------------------------------------------------------------
  export const CrearPruebaGenerica: string = "SELECT FUN_INSERTAR_PRUEBA_GENERICA_JSON($1,$2,$3,$4,$5,$6,$7,$8);";
  export const CrearPruebaGenericaTYT: string = "SELECT FUN_INSERTAR_PRUEBA_GENERICA_TYT_JSON($1,$2,$3,$4,$5,$6);";
  export const ObtenerPruebaID: string = "SELECT FUN_OBTENER_PRUEBA_JSON($1);";
  export const ObtenerPruebas: string = "SELECT FUN_OBTENER_PRUEBAS_JSON();";
  export const MatricularGrupoPrueba: string = "SELECT FUN_VINCULAR_ESTUDIANTES_A_PRUEBA($1,$2);";
  export const MatricularEstudiantePrueba: string = "SELECT FUN_VINCULAR_ESTUDIANTE_A_PRUEBA($1,$2);";
  export const ObtenerPreviewPrueba: string = "SELECT FUN_OBTENER_PRUEBA_DATOS_PREVIEW_JSON($1);";
  export const ObtenerPreguntasPrueba: string = "SELECT FUN_OBTENER_ID_PREGUNTAS_PRUEBA_JSON($1);";
  export const ObtenerPruebaDisponibleID: string = "SELECT FUN_OBTENER_PRUEBAS_ACTIVAS_ESTUDIANTE_JSON($1);";
  export const CrearPruebaCustom: string = "SELECT FUN_INSERTAR_PRUEBA_CUSTOMIZADA_JSON($1,$2,$3,$4,$5,$6,$7);";
  export const RegistrarFechaInicioPrueba: string = "SELECT FUN_REGISTRAR_FECHA_INICIO_PRUEBA_ESTUDIANTE($1,$2);";
  export const RegistrarFechaFinalizarPrueba: string = "SELECT FUN_REGISTRAR_FECHA_FIN_PRUEBA_ESTUDIANTE($1,$2);";
  export const ObtenerPruebaEnCursoID: string = "SELECT FUN_OBTENER_PRUEBAS_EN_CURSO_ESTUDIANTE_JSON($1);";
  export const ObtenerFinalizadasID: string = "SELECT FUN_OBTENER_FINALIZADAS_ESTUDIANTE_JSON($1);";
  export const ObtenerFechaInicioFinDuracionPrueba: string = "SELECT FUN_CAPTURAR_FECHA_INICIO_PRUEBA_ESTUDIANTE($1,$2);";
  export const RegistrarRespuestasPreguntasPruebaEstudiante: string = "SELECT FUN_REGISTRAR_RESPUESTA_PREGUNTA_ESTUDIANTE($1,$2,$3);";

  //FUNCIONES PARA EL CONTROLADOR DE RESULTADOS ---------------------------------------------------------------------------------------------------------
  export const ObtenerResultadosPruebaEstudiante: string = "SELECT FUN_OBTENER_PRUEBA_PRESENTADA_ESTUDIANTE_RESULTADOS_JSON($1,$2);";
  export const ObtenerPruebasFinalizadas : string = "SELECT FUN_OBTENER_PRUEBAS_FINALIZADAS_JSON();";
  export const ObtenerResultadosPrueba: string = "SELECT FUN_OBTENER_ANALISIS_PRUEBA_FINALIZADA_JSON($1);";
}
